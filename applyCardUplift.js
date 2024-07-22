$(document).ready(function () {
  const applyUplift = document.getElementById("applyCardUplift");
  if (!applyUplift) {
    console.log(
      "Element with ID 'applyCardUplift' not found. Aborting script."
    );
    return; // Exit the script if the element is not found
  }

  let animationTimelines = new Map();

  function animateStepZero(stepZero) {
    const stepZeroTl = gsap.timeline({ paused: true });
    stepZeroTl.fromTo(
      ".apply-house-fade-uplift",
      { opacity: "0%" },
      { opacity: "100%", duration: 1, stagger: 0.75, delay: 0.5 }
    );
    animationTimelines.set("stepZero", stepZeroTl);
    return stepZeroTl;
  }

  function animateStepTwo(stepTwo) {
    gsap.set(stepTwo, { rotationY: 0 });
    const stepTwoTl = gsap.timeline({ repeat: 1 });
    stepTwoTl
      .to(stepTwo, { rotationY: 5, duration: 0.5, ease: "power2.out" })
      .to(stepTwo, { rotationY: -5, duration: 1, ease: "power2.inOut" })
      .to(stepTwo, { rotationY: 0, duration: 0.5, ease: "power2.in" });
    animationTimelines.set("stepTwo", stepTwoTl);
    return stepTwoTl;
  }

  const stepTwo = document.getElementById("stepTwo");
  animateStepTwo(stepTwo);

  function animateStepThree(stepThree) {
    const coins = stepThree.querySelectorAll(".coin-apply");
    const stepThreeTl = gsap.timeline();
    stepThreeTl
      .from(coins, { y: -200, duration: 1, stagger: 0.05, ease: "bounce.out" })
      .fromTo(".coin-shadow", { opacity: 0 }, { opacity: 0.8, duration: 1 }, 0);
    animationTimelines.set("stepThree", stepThreeTl);
    return stepThreeTl;
  }

  const stepThree = document.getElementById("stepThree");
  animateStepThree(stepThree);

  function animateStepFour(stepFour) {
    const calc = stepFour.querySelectorAll(".calc-btn");
    const stepFourTl = gsap.timeline({ defaults: { duration: 0.35 } });

    calc.forEach((btn, i) => {
      const individualTl = gsap
        .timeline()
        .to(btn, { scale: 0.9 })
        .to(btn, { scale: 1, ease: "elastic.out(1, 0.5)" });

      stepFourTl.add(individualTl, i * 0.25);
    });

    animationTimelines.set("stepFour", stepFourTl);
    return stepFourTl;
  }

  const stepFour = document.getElementById("stepFour");
  animateStepFour(stepFour);

  function animateStepFive(stepFive) {
    gsap.set(".scales-lever", { rotationZ: 0 });
    gsap.set(".scale-left", { y: 0 });
    gsap.set(".scale-right", { y: 0 });

    let scalesLeftDistance = 17;
    let scalesRightDistance = -17;

    if (window.matchMedia("(max-width: 600px)").matches) {
      scalesLeftDistance = 14;
      scalesRightDistance = -14;
    }

    const stepFiveTl = gsap.timeline();
    stepFiveTl
      .to(".scales-lever", {
        rotationZ: -10,
        duration: 0.75,
        ease: "power1.in",
      })
      .to(
        ".scale-left",
        { y: scalesLeftDistance, duration: 0.75, ease: "power1.in" },
        "<"
      )
      .to(
        ".scale-right",
        { y: scalesRightDistance, duration: 0.75, ease: "power1.in" },
        "<"
      )
      .to(".scales-lever", {
        rotationZ: 5,
        duration: 1.5,
        ease: "back.out(1.7)",
      })
      .to(
        ".scale-left",
        { y: -scalesLeftDistance / 2, duration: 1.5, ease: "back.out(1.7)" },
        "<"
      )
      .to(
        ".scale-right",
        { y: -scalesRightDistance / 2, duration: 1.5, ease: "back.out(1.7)" },
        "<"
      )
      .to(
        ".scales-lever",
        { rotationZ: 0, duration: 1, ease: "power1.out" },
        "-=0.25"
      )
      .to(".scale-left", { y: 0, duration: 1, ease: "power1.out" }, "<")
      .to(".scale-right", { y: 0, duration: 1, ease: "power1.out" }, "<");

    animationTimelines.set("stepFive", stepFiveTl);
    return stepFiveTl;
  }

  const stepFive = document.getElementById("stepFive");
  animateStepFive(stepFive);

  function animateStepSix(stepSix) {
    const stepSixTl = gsap.timeline({ delay: 0.5 });
    const blackCircles = gsap.utils.toArray(
      ".apply-circle__inner, .apply-circle__outer"
    );
    const gradientCircles = gsap.utils.toArray(
      ".apply-circle__inner-gradient, .apply-circle__outer-gradient"
    );
    gsap.set(".apply-tick", { drawSVG: 0 });
    gsap.set(".apply-circle__outer", { drawSVG: 0 });
    gsap.set(".apply-circle__overlap", {
      scale: 0.5,
      transformOrigin: "103px 103px",
    });
    let video = document.getElementById("confettiVid");

    const ripplePulseTl = gsap.timeline();

    ripplePulseTl
      .to(".apply-circle__inner-gradient", {
        attr: { r: 108 },
        duration: 0.25,
        ease: "power1.out(1.7)",
      })
      .to(".apply-circle__inner-gradient", {
        attr: { r: 98 },
        duration: 0.25,
        ease: "back.in(1.7)",
      })
      .fromTo(
        ".apply-circle__outer-gradient",
        { attr: { r: 98 } },
        { attr: { r: 127.4 }, duration: 1.25, ease: "expo.out" }
      )
      .fromTo(
        ".apply-circle__overlap",
        { scale: 0.5, transformOrigin: "103px 103px" },
        {
          scale: 1.5,
          transformOrigin: "103px 103px",
          duration: 1.25,
          ease: "expo.out",
        },
        "<"
      )
      .set(
        ".apply-circle__outer-gradient, .apply-circle__overlap",
        { opacity: 0 },
        "-=1"
      )
      .to(
        video,
        {
          onStart: function () {
            video.currentTime = 0;
            video.play();
          },
          /* onReverseComplete: function() {video.pause(); video.currentTime = 0;},*/ duration:
            video.duration,
        },
        "-=1.5"
      );

    stepSixTl
      .fromTo(
        ".apply-circle__outer",
        { drawSVG: 0 },
        { drawSVG: true, ease: "power2.in", duration: 0.5 }
      )
      .fromTo(
        ".apply-circle__inner",
        { attr: { r: 0 } },
        { attr: { r: 98 }, ease: "back.out(1.7)", duration: 0.5 }
      )
      .fromTo(
        ".apply-tick",
        { drawSVG: 0 },
        { drawSVG: true, ease: "power1.in", duration: 0.4 },
        "-=0.1"
      )
      .fromTo(
        ".apply-circle__outer",
        { attr: { r: 98 } },
        { attr: { r: 127.4 }, duration: 1.25, ease: "expo.out" },
        "<"
      )
      .fromTo(
        ".apply-circle__overlap",
        { scale: 0.5, transformOrigin: "103px 103px" },
        {
          scale: 1.5,
          transformOrigin: "103px 103px",
          duration: 1.25,
          ease: "expo.out",
        },
        "<"
      )
      .fromTo(
        blackCircles,
        { opacity: 1 },
        { opacity: 0, duration: 0.5, ease: "power1.inOut" },
        "-=0.5"
      )
      .fromTo(
        gradientCircles,
        { opacity: 0, transformOrigin: "50% 50%" },
        {
          opacity: 1,
          transformOrigin: "50% 50%",
          duration: 0.5,
          ease: "power1.inOut",
        },
        "<"
      )
      .add(ripplePulseTl);

    const stepSixTimeline = {
      timeline: stepSixTl,
      restart: function () {
        stepSixTimeline.timeline.restart();
      },
    };

    animationTimelines.set("stepSix", stepSixTl);
    return stepSixTimeline;
  }

  const stepSix = document.getElementById("stepSix");
  animateStepSix(stepSix);

  function appSlides() {
    let splides = $("#applySplide");
    for (let i = 0, splideLength = splides.length; i < splideLength; i++) {
      const splideInstance = new Splide(splides[i], {
        perPage: 1,
        rewind: true,
        type: "fade",
        arrows: false,
        pagination: true,
        speed: 600,
        interval: 5000,
        autoplay: "pause",
        intersection: {
          inView: {
            autoplay: true,
          },
        },
        breakpoints: {
          767: {
            autoplay: false,
          },
        },
      });

      splideInstance.on("moved", function (newIndex, oldIndex, destIndex) {
        // console.log(`Splide moved event: newIndex=${newIndex}, oldIndex=${oldIndex}, destIndex=${destIndex}`);
      });

      splideInstance.on("active", function (slide) {
        //console.log(`Splide active event: index=${slide.index}`);
        const activeStep = slide.slide.querySelector(".step");
        const activeTimeline = animationTimelines.get(activeStep.id);

        if (activeTimeline && typeof activeTimeline.restart === "function") {
          activeTimeline.restart();
        }

        const totalSlides = splideInstance.length;
        const currentIndex = slide.index;
        const progressPercentage = 10 + (currentIndex / (totalSlides - 1)) * 90;
        gsap.to("#progCurtain", {
          width: `${progressPercentage}%`,
          duration: 0.5,
          ease: "power1.out",
        });

        const times = ["9:41", "9:42", "9:45", "9:46", "9:48", "9:50", "9:52"];
        if (times[currentIndex]) {
          document.getElementById("timeText").innerText = times[currentIndex];
        }
      });
      splideInstance.mount(window.splide.Extensions);
    }
  }

  appSlides();
});
