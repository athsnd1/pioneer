import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { HiOutlineClipboardDocumentCheck, HiOutlineClock, HiOutlineBookOpen, HiOutlinePlayCircle, HiOutlineChartBar, HiOutlineUserGroup } from "react-icons/hi2";
import { BsPeople } from "react-icons/bs";
import Footer from "../components/Footer";

export default function WelcomePage() {
  const features = [
    {
      icon: HiOutlineClock,
      title: "Track Hours",
      description: "Easily log and track your field service hours with precision",
      color: "text-amber-500"
    },
    {
      icon: BsPeople,
      title: "Return Visits",
      description: "Manage and monitor your return visits to interested individuals",
      color: "text-indigo-500"
    },
    {
      icon: HiOutlineBookOpen,
      title: "Bible Studies",
      description: "Keep track of your Bible studies and spiritual discussions",
      color: "text-emerald-500"
    },
    {
      icon: HiOutlinePlayCircle,
      title: "Video Presentations",
      description: "Record videos shown during your ministry activities",
      color: "text-sky-500"
    },
    {
      icon: HiOutlineChartBar,
      title: "Analytics",
      description: "View detailed statistics and monthly progress reports",
      color: "text-purple-500"
    },
    {
      icon: HiOutlineUserGroup,
      title: "Student Management",
      description: "Organize and manage your Bible student contacts",
      color: "text-slate-500"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-dvh flex flex-col bg-gray-100"
    >
      <Helmet>
        <title>Pioneer | Field Service Report Management</title>
        <meta name="description" content="Pioneer - Your comprehensive tool for creating and managing field service reports" />
        <link rel="canonical" href="/" />
      </Helmet>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-white to-gray-100">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center max-w-4xl"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <HiOutlineClipboardDocumentCheck className="text-6xl text-[var(--main-color)]" />
            <h1 className="text-5xl md:text-6xl font-[family-name:var(--bric)] font-medium text-[var(--main-color)]">
              Pioneer
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl font-[family-name:var(--sora)] text-[var(--deep-blue)] mb-4">
            Field Service Report Management
          </p>
          
          <p className="text-lg font-[family-name:var(--sora)] text-gray-600 mb-12 max-w-2xl mx-auto">
            Your comprehensive tool for creating, tracking, and managing field service reports with ease and precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/register"
              className="px-8 py-4 bg-[var(--main-color)] text-white font-[family-name:var(--sora)] font-semibold rounded-4xl hover:opacity-75 transition-all hover:scale-105 shadow-lg w-full sm:w-auto text-center"
            >
              Get Started
            </Link>
            <Link 
              to="/login"
              className="px-8 py-4 bg-white text-[var(--main-color)] font-[family-name:var(--sora)] font-semibold rounded-4xl border-2 border-[var(--main-color)] hover:bg-gray-50 transition-all hover:scale-105 w-full sm:w-auto text-center"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-[family-name:var(--bric)] font-medium text-[var(--deep-blue)] text-center mb-4">
            Everything You Need
          </h2>
          <p className="text-lg font-[family-name:var(--sora)] text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Streamline your field service reporting with powerful features designed for efficiency and accuracy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                className="p-6 rounded-xl bg-[var(--card-color)] border border-gray-300 hover:shadow-lg transition-all hover:scale-105 cursor-default"
              >
                <feature.icon className={`text-4xl ${feature.color} mb-4`} />
                <h3 className="text-xl font-[family-name:var(--sora)] font-semibold text-[var(--deep-blue)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-base font-[family-name:var(--sora)] text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="bg-[var(--main-color)] py-16 px-4 mb-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-[family-name:var(--bric)] font-medium text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg font-[family-name:var(--sora)] text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust Pioneer for their field service reporting needs.
          </p>
          <Link 
            to="/register"
            className="inline-block px-8 py-4 bg-white text-[var(--main-color)] font-[family-name:var(--sora)] font-semibold rounded-4xl hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
          >
            Create Your Account
          </Link>
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  );
}
