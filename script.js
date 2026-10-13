// =========================================================
// سَكَن
// script.js
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

  // =======================================================
  // العناصر الرئيسية
  // =======================================================

  const header =
    document.getElementById("header")

  const menuButton =
    document.getElementById("menuButton")

  const mainNav =
    document.getElementById("mainNav")

  const navLinks =
    document.querySelectorAll(".nav-link")

  const backToTop =
    document.getElementById("backToTop")

  const propertySearch =
    document.getElementById("propertySearch")

  const propertyForm =
    document.getElementById("propertyForm")

  const propertyMessage =
    document.getElementById("propertyMessage")

  const faqItems =
    document.querySelectorAll(".faq-item")

  const favoriteButtons =
    document.querySelectorAll(".favorite-button")

  const sections =
    document.querySelectorAll("main section[id]")


  // =======================================================
  // الهيدر عند التمرير
  // =======================================================

  function updateHeader() {

    if (!header) {
      return
    }

    if (window.scrollY > 30) {

      header.classList.add("scrolled")

    } else {

      header.classList.remove("scrolled")

    }

  }


  updateHeader()


  window.addEventListener(
    "scroll",
    updateHeader
  )


  // =======================================================
  // قائمة الهاتف
  // =======================================================

  function openMenu() {

    if (!menuButton || !mainNav) {
      return
    }

    mainNav.classList.add("active")

    menuButton.classList.add("active")

    document.body.classList.add("menu-open")

    menuButton.setAttribute(
      "aria-expanded",
      "true"
    )

  }


  function closeMenu() {

    if (!menuButton || !mainNav) {
      return
    }

    mainNav.classList.remove("active")

    menuButton.classList.remove("active")

    document.body.classList.remove("menu-open")

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    )

  }


  function toggleMenu() {

    if (!mainNav) {
      return
    }

    const isOpen =
      mainNav.classList.contains("active")

    if (isOpen) {

      closeMenu()

    } else {

      openMenu()

    }

  }


  if (menuButton) {

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    )

    menuButton.addEventListener(
      "click",
      toggleMenu
    )

  }


  navLinks.forEach(function (link) {

    link.addEventListener(
      "click",
      function () {

        closeMenu()

      }
    )

  })


  document.addEventListener(
    "click",
    function (event) {

      if (!mainNav || !menuButton) {
        return
      }

      if (
        !mainNav.classList.contains("active")
      ) {
        return
      }

      const clickedInsideNav =
        mainNav.contains(event.target)

      const clickedMenuButton =
        menuButton.contains(event.target)

      if (
        !clickedInsideNav &&
        !clickedMenuButton
      ) {

        closeMenu()

      }

    }
  )


  document.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Escape") {

        closeMenu()

      }

    }
  )


  window.addEventListener(
    "resize",
    function () {

      if (window.innerWidth > 900) {

        closeMenu()

      }

    }
  )


  // =======================================================
  // التنقل السلس
  // =======================================================

  const pageLinks =
    document.querySelectorAll('a[href^="#"]')


  pageLinks.forEach(function (link) {

    link.addEventListener(
      "click",
      function (event) {

        const targetId =
          link.getAttribute("href")

        if (
          !targetId ||
          targetId === "#"
        ) {
          return
        }

        const target =
          document.querySelector(targetId)

        if (!target) {
          return
        }

        event.preventDefault()

        const headerHeight =
          header
            ? header.offsetHeight
            : 0

        const targetTop =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight -
          15

        window.scrollTo({

          top: targetTop,

          behavior: "smooth"

        })

      }
    )

  })


  // =======================================================
  // تحديد القسم الحالي في القائمة
  // =======================================================

  function updateActiveNav() {

    if (!sections.length) {
      return
    }

    const headerHeight =
      header
        ? header.offsetHeight
        : 0

    const scrollPosition =
      window.scrollY +
      headerHeight +
      120

    let currentSection = ""


    sections.forEach(function (section) {

      const sectionTop =
        section.offsetTop

      const sectionHeight =
        section.offsetHeight

      if (
        scrollPosition >= sectionTop &&
        scrollPosition <
        sectionTop + sectionHeight
      ) {

        currentSection =
          section.getAttribute("id")

      }

    })


    navLinks.forEach(function (link) {

      link.classList.remove("active")

      const href =
        link.getAttribute("href")

      if (
        href === "#" + currentSection
      ) {

        link.classList.add("active")

      }

    })

  }


  updateActiveNav()


  window.addEventListener(
    "scroll",
    updateActiveNav
  )


  // =======================================================
  // البحث عن العقارات
  // =======================================================

  if (propertySearch) {

    propertySearch.addEventListener(
      "submit",
      function (event) {

        event.preventDefault()


        const searchType =
          document
            .getElementById("searchType")
            ?.value

        const searchProperty =
          document
            .getElementById("searchProperty")
            ?.value

        const searchLocation =
          document
            .getElementById("searchLocation")
            ?.value
            .trim()

        const searchBudget =
          document
            .getElementById("searchBudget")
            ?.value


        const propertiesSection =
          document.getElementById("properties")


        if (!propertiesSection) {
          return
        }


        const headerHeight =
          header
            ? header.offsetHeight
            : 0


        window.scrollTo({

          top:
            propertiesSection.offsetTop -
            headerHeight -
            15,

          behavior: "smooth"

        })


        const searchButton =
          propertySearch.querySelector(
            ".search-button"
          )


        if (searchButton) {

          const originalText =
            searchButton.textContent

          searchButton.disabled =
            true

          searchButton.textContent =
            "جارٍ البحث..."


          setTimeout(
            function () {

              searchButton.disabled =
                false

              searchButton.textContent =
                originalText

            },
            700
          )

        }


        console.log(
          "بحث تجريبي",
          {
            type: searchType,
            property: searchProperty,
            location: searchLocation,
            budget: searchBudget
          }
        )

      }
    )

  }


  // =======================================================
  // المفضلة
  // =======================================================

  favoriteButtons.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          const isActive =
            button.classList.contains("active")


          if (isActive) {

            button.classList.remove("active")

            button.textContent =
              "♡"

            button.setAttribute(
              "aria-label",
              "إضافة إلى المفضلة"
            )

          } else {

            button.classList.add("active")

            button.textContent =
              "♥"

            button.setAttribute(
              "aria-label",
              "إزالة من المفضلة"
            )

          }

        }
      )

    }
  )


  // =======================================================
  // الأسئلة الشائعة FAQ
  // =======================================================

  faqItems.forEach(function (item) {

    const question =
      item.querySelector(".faq-question")

    const answer =
      item.querySelector(".faq-answer")


    if (!question || !answer) {
      return
    }


    question.setAttribute(
      "aria-expanded",
      "false"
    )


    question.addEventListener(
      "click",
      function () {

        const isActive =
          item.classList.contains("active")


        faqItems.forEach(
          function (otherItem) {

            const otherAnswer =
              otherItem.querySelector(
                ".faq-answer"
              )

            const otherQuestion =
              otherItem.querySelector(
                ".faq-question"
              )

            otherItem.classList.remove(
              "active"
            )


            if (otherAnswer) {

              otherAnswer.style.maxHeight =
                null

            }


            if (otherQuestion) {

              otherQuestion.setAttribute(
                "aria-expanded",
                "false"
              )

            }

          }
        )


        if (!isActive) {

          item.classList.add("active")

          answer.style.maxHeight =
            answer.scrollHeight + "px"

          question.setAttribute(
            "aria-expanded",
            "true"
          )

        }

      }
    )

  })


  // =======================================================
  // نموذج إضافة العقار
  // =======================================================

  if (propertyForm) {

    propertyForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault()


        const ownerName =
          document
            .getElementById("ownerName")
            ?.value
            .trim()

        const ownerPhone =
          document
            .getElementById("ownerPhone")
            ?.value
            .trim()

        const propertyPurpose =
          document
            .getElementById("propertyPurpose")
            ?.value

        const propertyType =
          document
            .getElementById("propertyType")
            ?.value

        const propertyArea =
          document
            .getElementById("propertyArea")
            ?.value

        const propertyLocation =
          document
            .getElementById("propertyLocation")
            ?.value
            .trim()

        const propertyPrice =
          document
            .getElementById("propertyPrice")
            ?.value

        const propertyDescription =
          document
            .getElementById(
              "propertyDescription"
            )
            ?.value
            .trim()


        if (
          !ownerName ||
          !ownerPhone ||
          !propertyPurpose ||
          !propertyType ||
          !propertyArea ||
          !propertyLocation ||
          !propertyPrice ||
          !propertyDescription
        ) {

          showPropertyMessage(
            "يرجى تعبئة جميع الحقول المطلوبة",
            "error"
          )

          return

        }


        const phonePattern =
          /^[0-9+\-\s()]{7,20}$/


        if (
          !phonePattern.test(ownerPhone)
        ) {

          showPropertyMessage(
            "يرجى إدخال رقم هاتف صحيح",
            "error"
          )

          return

        }


        const areaNumber =
          Number(propertyArea)

        const priceNumber =
          Number(propertyPrice)


        if (
          !Number.isFinite(areaNumber) ||
          areaNumber <= 0
        ) {

          showPropertyMessage(
            "يرجى إدخال مساحة صحيحة للعقار",
            "error"
          )

          return

        }


        if (
          !Number.isFinite(priceNumber) ||
          priceNumber <= 0
        ) {

          showPropertyMessage(
            "يرجى إدخال سعر صحيح للعقار",
            "error"
          )

          return

        }


        const submitButton =
          propertyForm.querySelector(
            ".submit-button"
          )


        if (submitButton) {

          submitButton.disabled =
            true

          submitButton.textContent =
            "جارٍ إرسال البيانات..."

        }


        setTimeout(
          function () {

            showPropertyMessage(
              `شكرًا ${ownerName}، تم استلام بيانات العقار التجريبية بنجاح`,
              "success"
            )


            propertyForm.reset()


            if (submitButton) {

              submitButton.disabled =
                false

              submitButton.textContent =
                "إرسال بيانات العقار"

            }

          },
          700
        )

      }
    )

  }


  // =======================================================
  // رسائل النموذج
  // =======================================================

  function showPropertyMessage(
    message,
    type
  ) {

    if (!propertyMessage) {
      return
    }


    propertyMessage.textContent =
      message


    if (type === "error") {

      propertyMessage.style.color =
        "#d84c4c"

    } else {

      propertyMessage.style.color =
        "#2e7d5b"

    }

  }


  // =======================================================
  // زر العودة للأعلى
  // =======================================================

  function updateBackToTop() {

    if (!backToTop) {
      return
    }


    if (window.scrollY > 500) {

      backToTop.classList.add("show")

    } else {

      backToTop.classList.remove("show")

    }

  }


  updateBackToTop()


  window.addEventListener(
    "scroll",
    updateBackToTop
  )


  if (backToTop) {

    backToTop.addEventListener(
      "click",
      function () {

        window.scrollTo({

          top: 0,

          behavior: "smooth"

        })

      }
    )

  }


  // =======================================================
  // تأثير ظهور العناصر
  // =======================================================

  const revealElements =
    document.querySelectorAll(
      `
      .property-item,
      .type-card,
      .step-card,
      .why-feature,
      .review-card,
      .stat-item,
      .faq-item
      `
    )


  revealElements.forEach(
    function (element) {

      element.style.opacity =
        "0"

      element.style.transform =
        "translateY(24px)"

      element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease"

    }
  )


  if (
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        function (
          entries,
          observer
        ) {

          entries.forEach(
            function (entry) {

              if (
                entry.isIntersecting
              ) {

                entry.target.style.opacity =
                  "1"

                entry.target.style.transform =
                  "translateY(0)"

                observer.unobserve(
                  entry.target
                )

              }

            }
          )

        },
        {

          threshold: 0.12

        }
      )


    revealElements.forEach(
      function (element) {

        revealObserver.observe(
          element
        )

      }
    )

  } else {

    revealElements.forEach(
      function (element) {

        element.style.opacity =
          "1"

        element.style.transform =
          "translateY(0)"

      }
    )

  }


  // =======================================================
  // عداد الإحصائيات
  // =======================================================

  const statItems =
    document.querySelectorAll(
      ".stat-item strong"
    )


  function animateCounter(
    element
  ) {

    const originalText =
      element.textContent.trim()

    const numericText =
      originalText.replace(
        /[^0-9.]/g,
        ""
      )

    const target =
      parseFloat(numericText)


    if (
      !Number.isFinite(target)
    ) {
      return
    }


    const hasDecimal =
      originalText.includes(".")

    const hasPlus =
      originalText.includes("+")

    const duration =
      1200

    const startTime =
      performance.now()


    function updateCounter(
      currentTime
    ) {

      const progress =
        Math.min(
          (currentTime - startTime) /
          duration,
          1
        )


      const easedProgress =
        1 -
        Math.pow(
          1 - progress,
          3
        )


      const currentValue =
        target *
        easedProgress


      let displayValue


      if (hasDecimal) {

        displayValue =
          currentValue.toFixed(1)

      } else {

        displayValue =
          Math.floor(currentValue)
            .toLocaleString("en-US")

      }


      element.textContent =
        (hasPlus ? "+" : "") +
        displayValue


      if (progress < 1) {

        requestAnimationFrame(
          updateCounter
        )

      } else {

        element.textContent =
          originalText

      }

    }


    requestAnimationFrame(
      updateCounter
    )

  }


  if (
    "IntersectionObserver" in window
  ) {

    const counterObserver =
      new IntersectionObserver(
        function (
          entries,
          observer
        ) {

          entries.forEach(
            function (entry) {

              if (
                entry.isIntersecting
              ) {

                animateCounter(
                  entry.target
                )

                observer.unobserve(
                  entry.target
                )

              }

            }
          )

        },
        {

          threshold: 0.5

        }
      )


    statItems.forEach(
      function (item) {

        counterObserver.observe(
          item
        )

      }
    )

  }


})