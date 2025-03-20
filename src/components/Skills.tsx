"use client"
import { 
  Globe, 
  Code, 
  Brain, 
  Languages,
  FileCode,
  Terminal,
  Server,
  GitBranch,
  Cloud,
  Database,
  LineChart,
  Flame,
  TableProperties,
  Send
} from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from '@/context/language-context'
import { useTranslation } from '@/hooks/useTranslation'

const getSkills = (t: (key: string) => string) => [
  {
    category: t('skills.categories.Languages'),
    icon: Globe,
    items: [
      { name: t('skills.items.Arabic'), icon: Languages },
      { name: t('skills.items.English'), icon: Languages },
      { name: t('skills.items.French'), icon: Languages },
      { name: t('skills.items.German'), icon: Languages },
    ],
  },
  {
    category: t('skills.categories.Web Development'),
    icon: Code,
    items: [
      { name: t('skills.items.HTML/CSS'), icon: FileCode },
      { name: t('skills.items.JavaScript'), icon: Terminal },
      { name: t('skills.items.TypeScript'), icon: Code },
      { name: t('skills.items.React'), icon: Code },
      { name: t('skills.items.Next_js'), icon: Server },
      { name: t('skills.items.Firebase'), icon: Flame },
      { name: t('skills.items.SQL'), icon: TableProperties }
    ],
  },
  {
    category: t('skills.categories.AI & ML'),
    icon: Brain,
    items: [
      { name: t('skills.items.TensorFlow'), icon: Brain },
      { name: t('skills.items.PyTorch'), icon: LineChart },
      { name: t('skills.items.Scikit-learn'), icon: Database },
      { name: t('skills.items.Machine Learning'), icon: Brain },
      { name: t('skills.items.Deep Learning'), icon: Brain },
      { name: t('skills.items.Natural Language Processing'), icon: Brain },
      { name: t('skills.items.Computer Vision'), icon: Brain },
    ],
  },
  {
    category: t('skills.categories.Tools & Cloud'),
    icon: Terminal,
    items: [
      { name: t('skills.items.Git'), icon: GitBranch },
      { name: t('skills.items.GitHub'), icon: GitBranch },
      { name: t('skills.items.VS Code'), icon: Terminal },
      { name: t('skills.items.Azure'), icon: Cloud },
      { name: t('skills.items.Linux'), icon: Terminal },
      { name: t('skills.items.Postman'), icon: Send },  
    ],
  },
]

export function Skills() {
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const skills = getSkills(t)
  
  return (
    <section id="skills" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-12 text-gray-800 dark:text-white"
        >
          {t('skills.title')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group bg-white dark:bg-gray-800 rounded-xl p-6 
                        hover:shadow-2xl hover:-translate-y-1 
                        transition-all duration-300 border border-gray-100 
                        dark:border-gray-700 relative overflow-hidden"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Header - Changed from h4 to h3 to maintain proper hierarchy */}
            <div className="relative flex items-center mb-6 rtl:space-x-reverse">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 
                            rounded-xl transform group-hover:scale-110 
                            transition-transform duration-300
                            ltr:mr-4 rtl:ml-4">
                <skillGroup.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 
                          dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {skillGroup.category}
              </h3>
            </div>

            {/* Rest of the component remains the same */}
            <ul className="space-y-4 relative">
              {skillGroup.items.map((skill, skillIndex) => (
                <motion.li
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index * 0.1) + (skillIndex * 0.05) }}
                  className="flex items-center group/item"
                >
                  <div className="relative ltr:mr-4 rtl:ml-4">
                    <div className="absolute inset-0 bg-blue-500 rounded-full 
                                  transform scale-0 group-hover/item:scale-100 
                                  transition-transform duration-300" />
                    <skill.icon className="w-4 h-4 relative z-10 
                                          text-gray-600 dark:text-gray-400 
                                          group-hover/item:text-white transition-colors" />
                  </div>
                  <span className="text-gray-600 dark:text-gray-400 
                                group-hover/item:text-blue-500 transition-colors">
                    {skill.name}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Decorative Corner */}
            <div className="absolute -bottom-1 -right-1 w-16 h-16 
                          bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                          rounded-tl-3xl opacity-0 group-hover:opacity-100 
                          transition-opacity duration-500" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
}