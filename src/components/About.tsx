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
  Flame,    // Add for Firebase
  TableProperties,  // Add for SQL
  Send     // Add for Postman
} from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
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
      { name: t('skills.items.Firebase'), icon: Flame },      // Changed icon
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
export function About() {
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const skills = getSkills(t)
  return (
    <section id="about" className="py-20 bg-gray-100 dark:bg-gray-900">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            {t('about.title')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {t('about.description.first')}
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {t('about.description.second')}
          </p>
        </motion.div>
 {/* Image */}
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5, delay: 0.2 }}
  className="group relative w-80 h-80 mx-auto" // Increased from w-64 h-64 to w-80 h-80
>
  {/* Decorative Background Elements */}
  <div className="absolute -inset-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full 
                  opacity-75 group-hover:opacity-100 blur-lg transition-all duration-500 
                  group-hover:blur-xl animate-tilt">
  </div>
  
  {/* Decorative Dots Pattern */}
  <div className="absolute -right-10 -bottom-10 w-40 h-40 
                  bg-gradient-to-br from-blue-500/20 to-purple-500/20 
                  rounded-full blur-xl">
  </div>
  
  {/* Main Image Container */}
  <div className="relative z-10 w-full h-full rounded-full overflow-hidden 
                  ring-4 ring-white dark:ring-gray-800 shadow-xl">
    <Image
      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pic.jpg-ZVOn8cZhvmsJOsRLossXo8UgDkmffp.jpeg"
      alt="Mohamed Yaakoubi"
      fill
      className="object-cover object-top transition-all duration-500 
                group-hover:scale-110 group-hover:rotate-1"
      sizes="(max-width: 768px) 100vw, 320px" // Updated sizes prop
      priority
    />

    {/* Hover Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t 
                    from-gray-900 via-gray-900/40 to-transparent 
                    opacity-0 group-hover:opacity-60 
                    transition-opacity duration-300 z-20">
    </div>
  </div>

  {/* Corner Accent */}
  <div className="absolute -left-3 -top-3 w-20 h-20 
                  bg-blue-500/10 rounded-full blur-xl">
  </div>
</motion.div>
  
{/* Skills Section */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.4 }}
  className="md:col-span-2 mt-20"
>
<h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">
        {t('skills.title')}
      </h3>
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
        
     {/* Header */}
     <div className="relative flex items-center mb-6 rtl:space-x-reverse">
  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 
                rounded-xl transform group-hover:scale-110 
                transition-transform duration-300
                ltr:mr-4 rtl:ml-4">  {/* Increased from mr-3/ml-3 to mr-4/ml-4 */}
    <skillGroup.icon className="w-6 h-6 text-white" />
  </div>
  <h4 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 
               dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
    {skillGroup.category}
  </h4>
</div>

        {/* Skills List */}
        <ul className="space-y-4 relative">
          {skillGroup.items.map((skill, skillIndex) => (
           <motion.li
           key={skill.name}
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ delay: (index * 0.1) + (skillIndex * 0.05) }}
           className="flex items-center group/item"
         >
           <div className="relative ltr:mr-4 rtl:ml-4"> {/* Increased spacing here too */}
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
</motion.div>
        </div>
      </div>
    </section>
  );
}

