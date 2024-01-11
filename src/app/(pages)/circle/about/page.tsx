"use client";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

const AboutPage = () => {
  const [isShow, setIsShow] = useState(true);

  const variants = {
    show: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  //

  const helloVariants = {
    visible: {
      opacity: 1,
      transition: { when: "beforeChildren", staggerChildren: 3, duration: 3 },
    },
    hidden: { opacity: 0 },
  };

  const worldVariants = {
    visible: { opacity: 1, x: 50, transition: { duration: 1 } },
    hidden: { opacity: 0 },
  };

  //

  const menuVariants = {
    show: {
      transition: { staggerChildren: 0.1 },
    },
    hidden: {
      transition: { staggerChildren: 0.1, staggerDirection: -1 },
    },
  };

  const listVariants = {
    show: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };

  const menus = ["Home", "About", "Profile", "Product", "Links"];

  //

  const [open, setOpen] = useState(false);

  //

  const [scope, animate] = useAnimate();
  useEffect(() => {
    animate(scope.current, { rotate: 720, x: 135 }, { duration: 3 });
    animate("button", { opacity: 1 }, { duration: 3 });
  }, []);

  //

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.5, ease: "easeInOut" },
        opacity: { duration: 3 },
      },
    },
  };

  return (
    <>
      <div>AboutPage</div>

      <img src="../gradient.svg" alt="gradient.svg" />

      <motion.svg
        width="200" // SVGの幅を指定
        height="200" // SVGの高さを指定
        viewBox="0 0 512 512" // ビューボックスのサイズを指定
        className="h-8"
      >
        <motion.path
          d="M377.478,0.174c-34.179-3.423-37.602,44.438-119.644,78.618c-83.543,34.808-166.39,80.55-167.693,254.14
          c-0.155,18.807-1.314,51.296-1.513,65.056c-0.276,19.691,0.287,40.872-8.69,51.738c-7.311,8.857-20.176,18.818-32.866,27.531
          L81.87,512c31.032-24.306,39.834-26.493,46.35-26.35c15.549,0.342,31.33,0.496,47.155-0.762
          c100.318-7.995,202.137-56.718,253.379-149.714C521.042,167.679,411.657,3.598,377.478,0.174z"
          variants={draw}
          stroke="black"
          initial="hidden"
          animate="visible"
        />
        <motion.path
          d="M368.81,109.802
          c-6.184,20.817-26.957,51.826-91.925,128.445c-33.517,39.535-72.158,107.672-99.743,168.344
          c-8.361,18.388-36.432,4.925-26.405-13.473c13.042-19.403,43.08-104.117,86.558-160.968
          c43.489-56.862,101.411-105.685,110.378-133.801C351.857,79.112,377.048,82.116,368.81,109.802z"
          variants={draw}
          stroke="white"
          initial="hidden"
          animate="visible"
        />
      </motion.svg>

      <motion.div className="w-16" ref={scope} drag>
        <button
          onClick={() =>
            animate(scope.current, { rotate: 360 }, { duration: 1 })
          }
          className="opacity-0"
        >
          useAnimate
        </button>
        <p>refに直接アクセスします</p>
      </motion.div>

      <>
        <motion.div
          animate={open ? "open" : "closed"}
          className="absolute z-50"
        >
          <button onClick={() => setOpen((open) => !open)}>
            <svg width="23" height="20" viewBox="0 0 23 20">
              <motion.path
                fill="transparent"
                strokeWidth="3"
                stroke="hsl(0, 0%, 18%)"
                strokeLinecap="round"
                variants={{
                  closed: { d: "M 2 2.5 L 20 2.5" },
                  open: { d: "M 3 16.5 L 17 2.5" },
                }}
              ></motion.path>
              <motion.path
                fill="transparent"
                strokeWidth="3"
                stroke="hsl(0, 0%, 18%)"
                strokeLinecap="round"
                d="M 2 9.423 L 20 9.423"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
              ></motion.path>
              <motion.path
                fill="transparent"
                strokeWidth="3"
                stroke="hsl(0, 0%, 18%)"
                strokeLinecap="round"
                variants={{
                  closed: { d: "M 2 16.346 L 20 16.346" },
                  open: { d: "M 3 2.5 L 17 16.346" },
                }}
              ></motion.path>
            </svg>
          </button>
        </motion.div>
        <motion.div animate={open ? "open" : "closed"}>
          <motion.div
            style={{
              backgroundColor: "gray",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: "200px",
            }}
            variants={{
              closed: { left: -200, transition: { duration: 0.3 } },
              open: { left: 0, transition: { duration: 0.3 } },
            }}
          >
            <div style={{ marginTop: "50px", color: "white" }}>
              サイドメニュー
            </div>
          </motion.div>

          <button
            onClick={() => setOpen((open) => !open)}
            style={{ position: "absolute", top: 10, left: 10 }}
          >
            <svg width="23" height="20" viewBox="0 0 23 20">
              <motion.path
                fill="transparent"
                strokeWidth="3"
                stroke="hsl(0, 0%, 18%)"
                strokeLinecap="round"
                variants={{
                  closed: { d: "M 2 2.5 L 20 2.5" },
                  open: { d: "M 3 16.5 L 17 2.5" },
                }}
              ></motion.path>
              <motion.path
                fill="transparent"
                strokeWidth="3"
                stroke="hsl(0, 0%, 18%)"
                strokeLinecap="round"
                d="M 2 9.423 L 20 9.423"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
              ></motion.path>
              <motion.path
                fill="transparent"
                strokeWidth="3"
                stroke="hsl(0, 0%, 18%)"
                strokeLinecap="round"
                variants={{
                  closed: { d: "M 2 16.346 L 20 16.346" },
                  open: { d: "M 3 2.5 L 17 16.346" },
                }}
              ></motion.path>
            </svg>
          </button>
        </motion.div>
        <main style={{ marginTop: "50px" }}>メイン</main>
      </>

      <div className="py-4">
        <button onClick={() => setIsShow((isShow) => !isShow)}>Menu</button>
        <motion.ul variants={menuVariants} animate={isShow ? "show" : "hidden"}>
          {menus.map((menu) => (
            <motion.li variants={listVariants} key={menu}>
              {menu}
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <motion.div variants={helloVariants} animate="visible" initial="hidden">
        <h2>Hello</h2>
        <motion.div variants={worldVariants}>
          <h2>World!</h2>
        </motion.div>
        <motion.div variants={worldVariants}>
          <h2>World!</h2>
        </motion.div>
      </motion.div>

      <motion.img
        className="w-8 h-auto object-cover"
        src="../leaf.svg"
        alt="leaf"
        initial={{ x: "-10px" }}
        animate={{ x: 0, rotate: 135 }}
        transition={{ type: "spring" }}
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.1 },
        }}
      />
      <motion.div drag dragConstraints={{ top: 30 }}>
        <img className="w-8 h-auto object-cover" src="../leaf.svg" alt="leaf" />
      </motion.div>

      <motion.img
        className="w-8 h-auto object-cover"
        src="../leaf.svg"
        alt="leaf"
        initial={{ opacity: 0, x: 0 }}
        animate={{
          opacity: 1,
          x: [0, 135, 45, 0],
          scale: [1, 1.6, 1.2, 1],
          rotate: [0, 45, 135, 0],
        }}
        transition={{ delay: 0.5, duration: 1 }}
      />
      <button onClick={() => setIsShow((isShow) => !isShow)}>Click</button>
      <motion.nav animate={isShow ? "show" : "hidden"} variants={variants}>
        <div>Hello</div>
      </motion.nav>
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 3 }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{ once: true }}
      >
        <img
          className="mt-[1000px] w-8 h-auto object-cover"
          src="../leaf.svg"
          alt="leaf"
        />
      </motion.div>
    </>
  );
};

export default AboutPage;
