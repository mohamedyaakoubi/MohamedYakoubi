export const postContent = {
  title: "L'IA l'a Construit. Je l'ai Cassé. L'IA m'a Aidé à le Casser.",
  heroTitle: `<span class="hero-safe">L'IA l'a Construit.</span> <span class="hero-warn">Je l'ai Cassé.</span><br><em class="hero-danger">L'IA m'a Aidé à le Casser.</em>`,
  description: "Une histoire de curiosité, d'une campagne de jeu, de confiance côté client, et de ce qui arrive quand le développement assisté par IA est mis en production sans regard sur la sécurité — analysé avec l'aide de l'IA elle-même.",
  heroTag: "Analyse de Sécurité · 24/03/2026",
  tags: ["Test de Pénétration", "Sécurité Web", "Développement IA", "Divulgation Responsable", "Vibe Coding", "SecureByDesign", "Sécurité des Jeux", "Confiance Client"],
  content: `## 01 — Le Point de Départ

Je suis tombé sur une campagne de jeu — une plateforme web où de vrais utilisateurs s'affrontaient pour de vrais prix sur plusieurs jours. L'application était soignée. Des animations fluides, une interface propre, responsive sur mobile, multilingue. Il était évident qu'un effort considérable y avait été investi.

Un détail mérite d'être signalé d'emblée : l'application était principalement distribuée via une application mobile — le jeu s'exécutait à l'intérieur d'un navigateur intégré dans l'app. La plupart des utilisateurs y accédaient depuis leurs téléphones, dans l'application, sans aucun moyen d'ouvrir les outils de développement ou d'inspecter quoi que ce soit. L'URL web existait, mais l'expérience prévue était mobile en priorité et confinée.

C'est une hypothèse qui crée un faux sentiment de sécurité. Un navigateur intégré ne change pas ce que le serveur envoie. Les mêmes fichiers JavaScript, les mêmes réponses API, le même bundle client — tout est également accessible à quiconque ouvre l'URL dans un navigateur de bureau. L'enveloppe mobile est une couche UX, pas une frontière de sécurité.

Par curiosité analytique, c'est exactement ce que j'ai fait — j'ai ouvert l'URL dans un navigateur de bureau et appuyé sur F12.

La première chose que j'ai vue n'était pas l'application. C'était la console.

---

## 02 — Le Premier Signal : La Console

Avant toute analyse du code source, avant tout test d'API — au moment où les outils de développement se sont ouverts, la console du navigateur affichait un flux continu de logs internes de l'application.

Pas une ou deux lignes de debug. Chaque page. Chaque action. Chaque appel de service.

\`\`\`
[GAME SERVICE] Session démarrée : {sessionId}
[GAME SERVICE] Soumission du résultat : {sessionId, roundNumber, score}
[TEAM SERVICE] Équipe créée : {teamId}
[TEAM SERVICE] Invitation envoyée avec succès
[AUTH PROVIDER] Erreur 401, tentative de rafraîchissement du token
[AUTH PROVIDER] Token rafraîchi, nouvelle tentative de la requête
[AUTH PROVIDER] Déconnexion avec la locale : {locale}
[LOGIN PAGE] Appel de l'API OTP...
[LOGIN PAGE] API OTP réussie
\`\`\`

Identifiants de session, numéros de manche, scores, identifiants d'équipe, événements d'authentification, cycles de rafraîchissement de token, déclencheurs de déconnexion — tout en direct, tout visible, tout en production.

C'était le premier signal. Pas subtil du tout.

Quand une application journalise aussi intensément en production — sur chaque service, chaque page, chaque action utilisateur — cela vous dit l'une de deux choses : elle a été construite à la hâte, ou elle a été construite avec l'assistance de l'IA et le code de débogage n'a jamais été retiré. Dans ce cas, les preuves pointaient vers les deux.

Cela révélait aussi quelque chose sur l'hypothèse de déploiement. Le développeur avait distribué l'app dans un navigateur mobile intégré, où la plupart des utilisateurs n'ouvriraient jamais une console. Si les utilisateurs ne peuvent pas voir la console, les logs n'ont pas d'importance. Ce raisonnement, conscient ou non, est exactement le genre d'hypothèse qui mène à livrer des logs de débogage en production.

L'URL était publique. N'importe quel navigateur de bureau pouvait l'ouvrir. Et la console était une feuille de route vers tout ce qui a suivi.

---

## 03 — L'Architecture

Avant d'entrer dans les résultats, il est utile de comprendre avec quoi nous travaillons.

L'application était une app Next.js à rendu côté client (CSR) adossée à une API REST. Trois modes de jeu, un système d'équipes, un classement, et une authentification téléphonique par OTP.

:::arch
CLIENT (Application CSR navigateur)
  │
  ├── Interface de jeu ────────── résultat généré ici ⚠️
  ├── Calcul du score ─────────── aléatoire côté client ⚠️
  ├── Signature HMAC ─────────── clé secrète du serveur ⚠️
  └── Logs console (production) ── internals de session exposés ⚠️

API (Backend REST)
  │
  ├── POST /session/create ──────── retourne la clé de signature ⚠️
  ├── POST /session/:id/submit-round ── accepte les valeurs du client ⚠️
  └── POST /session/:id/submit-result ── accepte le gagnant du client ⚠️
:::

La stack elle-même est moderne et raisonnable. Les vulnérabilités ne résidaient pas dans les choix technologiques — elles résidaient dans le modèle de confiance. Plus précisément, la confiance accordée par le serveur au client pour rapporter honnêtement ses propres résultats de jeu.

---

## 04 — Les Résultats

---

### Résultat 1 — Résultats de Jeu Contrôlés par le Client + Falsification HMAC [Critique]

Le jeu générait les valeurs de résultat entièrement dans le navigateur à l'aide d'une fonction aléatoire côté client. Ces valeurs — les entrées et le score calculé — étaient ensuite envoyées au serveur avec une signature HMAC pour prouver l'intégrité.

Le schéma HMAC était un mécanisme de sécurité légitime en concept. Le défaut fatal : la clé de signature était retournée par le serveur dans la réponse de création de session.

\`\`\`javascript
// Modèle : formule de signature exposée dans le bundle client
function signOutcome(sessionId, roundNumber, input1, input2, score, timestamp, signingKey) {
  const message = \\\`\\\${sessionId}:\\\${roundNumber}:\\\${input1}:\\\${input2}:\\\${score}:\\\${timestamp}\\\`;
  return HMAC_SHA256(message, signingKey);
}
\`\`\`

Une fois qu'un joueur avait la clé de signature, il pouvait falsifier une signature valide pour n'importe quelles valeurs de résultat et n'importe quel score de son choix. Le serveur n'avait aucun moyen de distinguer une soumission légitime d'une soumission falsifiée — les deux utilisaient la clé correcte pour produire une signature correcte.

Le chemin d'exploitation :

\`\`\`javascript
// Étape 1 — Créer une session, capturer la clé de signature de la réponse
const { sessionId, signingKey } = await createSession();

// Étape 2 — Pour chaque manche, falsifier les valeurs maximales et les signer
for (let round = 1; round <= TOTAL_ROUNDS; round++) {
  const timestamp = Date.now();
  const signature = signOutcome(sessionId, round, MAX_INPUT, MAX_INPUT, MAX_SCORE, timestamp, signingKey);

  // Étape 3 — Soumettre le résultat falsifié — le serveur accepte car la signature est valide
  await submitRound({ round, input1: MAX_INPUT, input2: MAX_INPUT, score: MAX_SCORE, timestamp, signature });
}
// Résultat : score maximum possible enregistré. Serveur accepté sans question.
\`\`\`

La clé de signature était la seule chose qui séparait le serveur d'une soumission falsifiée. En la retournant dans la réponse de session, le schéma ne protégeait rien. La logique était saine. La distribution de la clé ne l'était pas.

Le score maximum possible sur toutes les manches a été soumis, accepté et reflété sur le classement.

Cette classe d'attaque s'applique à tout mode de jeu utilisant le même schéma — si la clé de signature est retournée depuis n'importe quel endpoint de session, ce mode est également vulnérable.

**Correction :** Générer toutes les valeurs de résultat côté serveur. Ne jamais accepter des entrées de jeu ou des scores du client. Ne jamais retourner une clé de signature dans une réponse API. Si le serveur génère le résultat, il n'y a rien à falsifier.

---

### Résultat 2 — Aucune Protection d'Intégrité sur la Soumission de Manche [Critique]

Un second mode de jeu — joueur contre ordinateur — n'avait aucun mécanisme d'intégrité du tout. L'endpoint de soumission acceptait les résultats complets de la manche directement du client, y compris quel joueur avait gagné chaque manche, quelle était chaque valeur d'entrée, et le score final.

\`\`\`javascript
// Modèle : le client soumet son propre résultat de jeu
await submitGameResult({
  score: TOTAL_ROUNDS,
  rounds: [
    { round: 1, playerInput: MAX_VALUE, opponentInput: MIN_VALUE, winner: 'player' },
    { round: 2, playerInput: MAX_VALUE, opponentInput: MIN_VALUE, winner: 'player' },
    { round: 3, playerInput: MAX_VALUE, opponentInput: MIN_VALUE, winner: 'player' }
  ]
});
// Réponse : { success: true }
\`\`\`

Le serveur avait prédéterminé le résultat du jeu en interne — un flag de résultat existait dans la logique de session — mais ne l'a jamais appliqué lors de la soumission. Le résultat fourni par le client surpassait tout. Un seul appel API. Gagnant : joueur. À chaque fois.

**Correction :** Déterminer les résultats du jeu côté serveur. Ne jamais accepter des valeurs de résultat, des entrées de l'adversaire, ou la détermination du gagnant du client.

---

### Résultat 3 — Logs Console Verbeux en Production [Élevé]

Comme décrit en introduction — les logs console n'étaient pas accidentels. Ils étaient omniprésents. Chaque service majeur, chaque action utilisateur, chaque événement d'authentification s'affichait dans la console du navigateur en production.

C'est un symptôme direct du code généré par IA. Quand vous demandez à une IA d'ajouter du logging à un service, elle en ajoute partout — parce qu'un logging exhaustif est utile pendant le développement. Elle ne distingue pas les contextes développement et production à moins d'être explicitement demandé. Elle n'ajoute pas de vérifications d'environnement. Elle ne retire pas les instructions de debug avant le déploiement. Elle optimise pour la tâche immédiate.

Le résultat est un flux de debug interne en direct remis à chaque utilisateur qui sait comment appuyer sur F12.

**Correction :** Supprimer tous les appels console.log avant les builds de production. Utiliser une bibliothèque de logging avec des contrôles de niveau d'environnement, ou ajouter une étape de build qui retire automatiquement les sorties de debug.

---

### Résultat 4 — Les Sessions Abandonnées Consomment la Limite Quotidienne [Élevé]

Démarrer une session de jeu consommait immédiatement la limite de jeu quotidienne de l'utilisateur — même si la session expirait inutilisée. Une interruption réseau, un onglet fermé, ou une connexion lente brûlaient silencieusement la seule tentative de l'utilisateur pour la journée.

Sa progression affichait score: 0, status: NOT_PLAYED — mais aucune nouvelle session ne pouvait être créée. Les codes d'erreur de limite quotidienne (\`dailyPlayLimitReached\` pour le mode solo, \`dailyLimitReached\` pour le mode équipe) bloquaient toute tentative supplémentaire, qu'une session ait réellement été jouée ou non.

Ce n'est pas une vulnérabilité de sécurité au sens traditionnel, mais c'est un défaut de logique métier avec de vraies conséquences pour les joueurs légitimes. Dans une campagne avec des prix, un utilisateur perdant sa tentative quotidienne à cause d'un timeout réseau est un problème significatif d'UX et d'équité.

**Correction :** Ne consommer la limite quotidienne qu'à la complétion réussie de la session (sessionCompleted: true), pas à la création de session.

---

### Résultat 5 — Logique de Jeu Complète Exposée dans le Bundle Client [Élevé]

Au-delà des logs console et de la logique de résultat, le bundle client contenait bien plus que ce dont une couche de rendu a besoin :

- La formule de signature complète avec son modèle complet de construction de message
- L'algorithme de scoring complet incluant les conditions de bonus
- Toutes les structures de routes API sur tous les modes de jeu
- Les valeurs du cycle de vie de session pour chaque mode
- Un registre complet de codes d'erreur internes sur tous les domaines — auth, logique de jeu, opérations d'équipe, sécurité, et validation
- La clé secrète de signature stockée dans l'état du composant, lisible via les outils de développement du navigateur

Un analyste motivé pouvait reconstruire l'intégralité de la surface API backend, la logique métier, le comportement de gestion des erreurs, et le modèle de sécurité en 30 minutes de lecture du bundle. Les logs console accéléraient encore davantage ce processus — les labels de service et les noms d'action pointaient directement vers les sections de code pertinentes.

**Correction :** Le client ne devrait recevoir que ce dont il a besoin pour afficher l'état courant. Les formules de scoring, les implémentations HMAC, et les taxonomies d'erreur internes appartiennent au serveur.

---

### Récapitulatif des Résultats

| Résultat | Sévérité | Statut |
|----------|----------|--------|
| Résultats de jeu contrôlés par le client + falsification HMAC | Critique | Exploité et Confirmé |
| Aucune intégrité sur la soumission de manche | Critique | Exploité et Confirmé |
| Logs console verbeux en production | Élevé | Confirmé |
| Les sessions abandonnées consomment la limite quotidienne | Élevé | Confirmé |
| Logique de jeu complète exposée dans le bundle client | Élevé | Confirmé |

---

## 05 — La Cause Profonde

Chaque résultat critique partage la même cause profonde : le serveur faisait confiance au client.

C'est le péché cardinal de la sécurité des jeux compétitifs. Dans tout système où les résultats ont une valeur réelle — prix, classements, récompenses monétaires — le serveur doit être la seule autorité sur l'état du jeu. Le client est une couche d'affichage. Il montre au joueur ce qui se passe. Il ne décide pas ce qui se passe.

L'architecture correcte :

:::diagram
CLIENT|Créer session|SERVEUR
SERVEUR|{ sessionId }|CLIENT|Pas de secret. Pas de clé de signature.
CLIENT|"Générer résultat"|SERVEUR|Juste un déclencheur.
SERVEUR|{ input1, input2, score }|CLIENT|Le serveur génère. Le serveur calcule.
CLIENT|"Soumettre manche"|SERVEUR|Pas de valeurs. Le serveur sait déjà.
SERVEUR|{ roundResult }|CLIENT
:::

Dans ce modèle, il n'y a rien à falsifier. Le client ne détient jamais de valeurs qui comptent. Le schéma HMAC devient entièrement inutile — parce que le serveur n'a jamais besoin de demander au client de prouver quoi que ce soit sur l'état du jeu. Le serveur a déjà la vérité terrain.

---

## 06 — La Vraie Histoire : L'IA l'a Construit. Et l'IA l'a Trouvé.

:::quote
Les outils de codage IA optimisent pour une seule chose : <span>faire fonctionner le code.</span>
Ils ne sont pas des ingénieurs en sécurité.
:::

L'application avait été construite avec une aide significative de l'IA. Le code était propre, bien structuré, nommé de façon cohérente, et couvrait correctement les cas limites. Le développeur a utilisé efficacement les outils IA pour construire un produit fonctionnel et soigné rapidement. C'est véritablement impressionnant.

Mais les outils de codage IA ont un angle mort fondamental : ils optimisent pour la correction fonctionnelle, pas pour la sécurité.

Quand vous demandez à une IA d'implémenter la génération de résultats pour un jeu navigateur, elle le génèrera côté client en utilisant une fonction aléatoire. C'est la solution correcte, idiomatique et fonctionnelle pour un jeu navigateur. L'IA ne sait pas que votre jeu a de vrais prix. Elle ne sait pas que l'aléatoire côté client dans un contexte compétitif est une vulnérabilité critique. Elle produit du code fonctionnel et passe à la suite.

Quand vous lui demandez d'implémenter une vérification basée sur signature pour les soumissions de jeu, elle génèrera une implémentation fonctionnelle. Elle pourrait même suggérer de retourner la clé de signature depuis l'endpoint de session — parce que c'est un endroit naturel pour initialiser l'état partagé entre client et serveur. Elle ne raisonne pas sur l'implication sécuritaire d'exposer un secret cryptographique à la partie contre laquelle vous essayez de vous défendre.

Quand vous lui demandez d'ajouter du logging pour le debug, elle ajoutera des instructions dans chaque service, chaque composant, chaque action. Elle n'ajoutera pas de vérifications d'environnement. Elle ne vous rappellera pas de les supprimer avant le déploiement. Elle optimise pour la tâche immédiate — et la tâche immédiate était de faciliter le développement, pas de préparer la production.

Le résultat est du code qui :
- Passe tous les tests fonctionnels
- Fonctionne correctement en développement
- A l'air professionnel et bien structuré
- Contient des hypothèses de sécurité qui n'ont jamais été validées

Ce n'est pas un échec d'intelligence ou d'effort. C'est un échec de contexte. L'outil n'a pas reçu un modèle de menace. Il a reçu des exigences fonctionnelles. Il y a répondu complètement.

Voici maintenant la partie sur laquelle il vaut la peine de réfléchir.

**Cette analyse entière a également été conduite avec l'assistance de l'IA.**

La méthodologie, l'énumération du code source, les scripts d'exploitation, les tests API, les résultats structurés — tout développé de façon collaborative avec un outil IA. Le même type d'outil qui avait introduit ces vulnérabilités a été utilisé pour les trouver.

Ce n'est pas une contradiction. Cela illustre quelque chose de précis :

Les outils IA sont des multiplicateurs de force. Ils amplifient les intentions et les connaissances de la personne qui les opère. Un développeur utilisant l'IA pour livrer vite, sans conscience sécuritaire, livre vite et de façon non sécurisée. Un analyste en sécurité utilisant l'IA pour énumérer systématiquement, avec des connaissances en sécurité, analyse plus vite et plus en profondeur.

:::alert
**Le problème n'est pas l'outil. Le problème est le workflow.** Le développement assisté par IA sans étape de revue de sécurité produira systématiquement des applications qui fonctionnent parfaitement et échouent les audits.
:::

L'outil est neutre. La conscience, elle, ne l'est pas.

---

## 07 — Ce qu'il Faut Ajouter à Votre Workflow

Rien de tout cela ne nécessite une équipe de sécurité dédiée. Cela nécessite de la conscience et une checklist.

1. **Ne jamais faire confiance au client pour les résultats compétitifs.** Toute valeur qui affecte les scores, les classements, ou les prix doit être générée et validée côté serveur. Le client est une couche d'affichage.

2. **Ne jamais retourner des secrets dans les réponses API.** Si vous signez des données, la clé de signature ne doit jamais voyager vers le client. Si le client a la clé, la signature ne prouve rien.

3. **Supprimer les sorties de débogage avant de livrer.** Mettre en place une étape de build qui supprime ou désactive tous les appels console.log en production. Un navigateur mobile intégré ne rend pas les logs console invisibles — il les rend juste moins pratiques à consulter.

4. **Ne pas traiter la distribution mobile comme une frontière de sécurité.** Si votre application a une URL publique, n'importe qui peut l'ouvrir dans un navigateur de bureau. Concevez pour le web ouvert, pas pour le parcours utilisateur attendu.

5. **Ouvrez votre propre application dans les DevTools avant que vos utilisateurs le fassent.** Lisez votre propre console. Lisez vos propres requêtes réseau. Lisez votre propre bundle JS. Si vous pouvez comprendre toute votre logique métier depuis le client, n'importe qui d'autre peut le faire aussi.

6. **Ajoutez une invite de revue de sécurité à votre workflow IA.** Après avoir généré une fonctionnalité, demandez explicitement : "Quelles sont les implications de sécurité de cette implémentation ? Qu'est-ce qu'un attaquant pourrait exploiter ici ?" L'outil ne le proposera pas de lui-même — il faut le demander.

7. **Traitez les entrées client comme non fiables par défaut.** Validez et reconstruisez toutes les valeurs critiques au jeu côté serveur, quel que soit ce que le client envoie.

---

## Conclusion

L'objectif de ce post n'est pas d'embarrasser qui que ce soit. Construire une plateforme de jeu full-stack, seul, avec une deadline, est véritablement difficile. Le développeur a livré quelque chose avec lequel de vrais utilisateurs se sont engagés. Ce n'est pas rien.

L'objectif est de rendre ce pattern visible — parce qu'il se reproduira. À mesure que le développement assisté par IA devient la norme, l'écart entre "fonctionne correctement" et "fonctionne de façon sécurisée" s'élargira à moins que les développeurs ne le comblent activement.

La sécurité n'est pas une fonctionnalité qu'on ajoute après coup. C'est une décision architecturale qu'on prend avant d'écrire la première ligne de code.

L'IA peut vous aider à construire. Assurez-vous que c'est vous qui pensez à la sécurité.

---

*Tous les tests décrits dans ce post ont été conduits de façon analytique et de bonne foi sur des comptes que je contrôlais. Aucune donnée utilisateur n'a été consultée, extraite ou retenue. Aucun système n'a été endommagé.*

*— Rédigé avec l'assistance de l'IA, relu avec le jugement humain.*`,
};
