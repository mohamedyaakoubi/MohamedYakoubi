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
  LineChart
} from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"


const skills = [
  {
    category: "Languages",
    icon: Globe,
    items: [
      { name: "Arabic", icon: Languages },
      { name: "English", icon: Languages },
      { name: "French", icon: Languages },
      { name: "German", icon: Languages },
    ],
  },
  {
    category: "Web Development",
    icon: Code,
    items: [
      { name: "HTML/CSS", icon: FileCode },
      { name: "JavaScript", icon: Terminal },
      { name: "TypeScript", icon: Code },
      { name: "React", icon: Code },
      { name: "Next.js", icon: Server },
    ],
  },
  {
    category: "AI & ML",
    icon: Brain,
    items: [
      { name: "TensorFlow", icon: Brain },
      { name: "PyTorch", icon: LineChart },
      { name: "Scikit-learn", icon: Database },
    ],
  },
  {
    category: "Tools & Cloud",
    icon: Terminal,
    items: [
      { name: "Git", icon: GitBranch },
      { name: "GitHub", icon: GitBranch },
      { name: "VS Code", icon: Terminal },
      { name: "Azure", icon: Cloud },
    ],
  },
]
export function About() {
  return (
    <section id="about" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">About Me</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Driven, adaptable, and passionate about advancing technology, I am a fast learner who thrives on tackling
              complex challenges and acquiring new skills quickly. With hands-on experience in AI, web development, and
              localization, I seek opportunities that foster innovation and personal growth.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              I am dedicated to leveraging my technical and problem-solving abilities to create solutions that make a
              meaningful difference. Eager to join collaborative environments, I aim to contribute effectively and grow
              alongside motivated teams.
            </p>
          </motion.div>
  
          {/* Image */}
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5, delay: 0.2 }}
  className="group relative w-full max-w-sm mx-auto"
>
  {/* Decorative Background Elements */}
  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl 
                  opacity-75 group-hover:opacity-100 blur-lg transition-all duration-500 
                  group-hover:blur-xl animate-tilt">
  </div>
  
  {/* Decorative Dots Pattern */}
  <div className="absolute -right-8 -bottom-8 w-32 h-32 
                  bg-gradient-to-br from-blue-500/20 to-purple-500/20 
                  rounded-full blur-xl">
  </div>
  
  {/* Main Image Container */}
  <div className="relative z-10 aspect-[4/5] rounded-2xl overflow-hidden 
                  ring-4 ring-white dark:ring-gray-800 shadow-xl">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                    mix-blend-overlay z-10">
    </div>
    
    <Image
      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pic.jpg-ZVOn8cZhvmsJOsRLossXo8UgDkmffp.jpeg"
      alt="Mohamed Yaakoubi"
      fill
      className="object-cover object-top transition-all duration-500 
                group-hover:scale-110 group-hover:rotate-1"
      sizes="(max-width: 768px) 100vw, 50vw"
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
  <div className="absolute -left-2 -top-2 w-16 h-16 
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
    Skills & Expertise
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
        <div className="relative flex items-center mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 
                        rounded-xl mr-3 transform group-hover:scale-110 
                        transition-transform duration-300">
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
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full 
                              transform scale-0 group-hover/item:scale-100 
                              transition-transform duration-300" />
                <skill.icon className="w-4 h-4 mr-3 relative z-10 
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

