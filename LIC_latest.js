window.onload = function () {
    //loads with page to account for Canvas loading JS first
  
    //Global Javascript
  
    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.visibility === "visible") {
          panel.style.visibility = "hidden";
          panel.style.height = "0";
          panel.style.padding = "0";
        } else {
          panel.style.visibility = "visible";
          panel.style.height = "unset";
          panel.style.padding = "6px 14px";
        }
      });
    }
  
    function h5pIframeHeight() {
        var h5pScript = document.createElement("script");
        h5pScript.setAttribute("charset", "UTF-8");
        h5pScript.setAttribute(
          "src",
          "https://loree-h5p.crystaldelta.net/wp-content/plugins/h5p/h5p-php-library/js/h5p-resizer.js"
        );
        document.body.appendChild(h5pScript);
      }
      
      h5pIframeHeight();
      window.addEventListener("message", receiveMessage, false);

    // Added by Carla on 2023/04/12
    /* Zoomable image JavaScript */
    $(document).ready(function() {
        $('img').click(function() {
            var $overlay = $('<div class="zoomable-image-overlay"></div>');
            var $image = $('<img class="zoomable-image-overlay-content" src="' + $(this).attr('src') + '">');
            var $closeButton = $('<div class="zoomable-image-close">&times;</div>');
            $overlay.append($image).append($closeButton);
            $('body').append($overlay);
            $overlay.fadeIn('fast');
            $closeButton.click(function() {
                $overlay.fadeOut('fast', function() {
                    $overlay.remove();
                });
            });
        });
    });
  
    popupHeadingUpdate();
    initTab();
    initCarousels();
    initInlineQuiz();
    initULOContent();
  };


  function popupHeadingUpdate() {
    $(".transcript-button").click(function () {
      var _getHeading = $(this).attr("title");
      var _gethref = $(this).attr("href");
  
      setTimeout(function () {
        $(".ui-dialog .ui-dialog-titlebar span.ui-dialog-title").html(
          _getHeading
        );
      }, 300);
    });
  }


  function initCarousels() {
    console.log("Loading Carousel");
    var e = 0;
    $(".oes-carousel").each(function() {
        if ($(this).bind("resize", function(e) {
            $(this).context.clientHeight,
            $(".oes-carousels-bottom-nav").height()
        }),
        e++,
        0 === $(this).find("> ul").length) {
            $(this).prepend('<ul class="oes-carousel-bottom-nav"></ul>'),
            $(this).prepend('<a class="oes-carousel-side-nav left"><i><img src="https://oes-canvas-assets.s3.ap-southeast-2.amazonaws.com/assets/icons/svg/arrowOpenLeft.svg"/></i></a>'),
            $(this).prepend('<a class="oes-carousel-side-nav right"><i><img src="https://oes-canvas-assets.s3.ap-southeast-2.amazonaws.com/assets/icons/svg/arrowOpenRight.svg"/></i></a>');
            var t = 0;
            $(this).find("> div").each(function() {
                t++,
                $(this).prop("id", "oes-carousel-" + e + "-section-" + t),
                $(this).parent().find("ul.oes-carousel-bottom-nav").append('<li><a data-section-select="' + t + '" href="#' + $(this).prop("id") + '"></a></li>'),
                $(this).wrapInner('<div class="oes-carousel-section-content"></div>')
            }),
            $(this).tabs(),
            $(this).css("visibility", "visible"),
            $(this).find("> ul.oes-carousel-bottom-nav").insertAfter($(this).find("> div").last()),
            $(this).trigger($.Event("resize")),
            $(this).find("> ul.oes-carousel-bottom-nav > li a").bind("click", function(e) {
                $(this).trigger($.Event("resize"))
            })
        }
        $(".oes-carousel-side-nav", $(this)).on("click", function(e) {
            e.preventDefault();
            var t, i = $(this).parent().find("ul.oes-carousel-bottom-nav > li").length, n = $($(this).parent().find("ul.oes-carousel-bottom-nav > li.ui-state-active a")).data("section-select");
            $(this).hasClass("right") ? t = n < i ? n + 1 : 1 : $(this).hasClass("left") && (t = 1 === n ? i : n - 1),
            $(this).parent().find("> ul.oes-carousel-bottom-nav > li:nth-of-type(" + t + ") a").trigger("click")
        })
    })
}


  /*function carouselsInit() {
    let currentSlide = 0, theSlides = document.getElementsByClassName('widget_media_image'), customSliderTimer, next, prev, theWrapper = document.getElementById('my-custom-slider-demo');
    function customNavToNextSlide() {
        next = (currentSlide < theSlides.length - 1) ? currentSlide + 1 : 0;
        customSetCurrentSlide(next);
    }
    function customNavToPrevSlide() {
        prev = (currentSlide > 0) ? currentSlide - 1 : theSlides.length - 1;
        customSetCurrentSlide(prev);
    }
    function customSetCurrentSlide(to) {
        clearInterval(customSliderTimer);
        for (let i = 0; i < theSlides.length; i++) {
            if (currentSlide == i) {
                theSlides[currentSlide].classList.remove('active');
            }
            if (next == i) {
                theSlides[to].classList.add('active');
            }
        }
        currentSlide = to;
        customSliderStart();
    }
    function customSliderStart() {
        customSliderTimer = setInterval(function () {
            customNavToNextSlide();
        }, 5000);
    }
    function customSliderInit() {
        let height = theSlides[0].getElementsByClassName("slidercnt").height;
        console.log(theSlides[0].getElementsByClassName("slidercnt")[0].height);
        theWrapper.style.height = height + 'px';
        for (let i = 0; i < theSlides.length; i++) {
            theSlides[i].style.height = height + 'px';
        }
    }
    if (typeof theSlides !== 'undefined') {
        window.addEventListener('resize', customSliderInit);
        customSliderInit();
        if (theSlides.length > 1) {
            customSliderStart();
        }
    }
}*/

  
  function initCarousels() {
    var e = 0;
  
    $(".oes-carousel").each(function () {
      if (
        ($(this).bind("resize", function (e) {
          $(this).context.clientHeight, $(".oes-carousels-bottom-nav").height();
        }),
        e++,
        0 == $(this).find("> ul").length)
      ) {
        $(this).prepend('<ul class="oes-carousel-bottom-nav"></ul>'),
          $(this).prepend(
            '<a class="oes-carousel-side-nav left leftArrow"><i class="icon-arrow-open-left"></i></a>'
          ),
          $(this).prepend(
            '<a class="oes-carousel-side-nav right rightArrow"><i class="icon-arrow-open-right"></i></a>'
          );
        var t = 0;
        $(this)
          .find("> div")
          .each(function () {
            t++,
              $(this)
                .prop("class", "oes-carousel-cnt")
                .prop("id", "oes-carousel-" + e + "-section-" + t),
              $(this)
                .parent()
                .find("ul.oes-carousel-bottom-nav")
                .append(
                  '<li class="slider_' +
                    t +
                    ' slider"><a data-section-select="' +
                    t +
                    '" class="dots" id="' +
                    $(this).prop("id") +
                    '" href="javascript:void(0)"></a></li>'
                ),
              $(this).wrapInner(
                '<div class="oes-carousel-section-content"></div>'
              );
          }),
          $(this).css("visibility", "visible"),
          $(this)
            .find("> ul.oes-carousel-bottom-nav")
            .insertAfter($(this).find("> div").last()),
          $(this).trigger($.Event("resize")),
          $(this)
            .find("> ul.oes-carousel-bottom-nav > li a")
            .bind("click", function (e) {
              $(this).trigger($.Event("resize"));
            });
      }
  
      $("#oes-carousel-1-section-" + curSlide).show();
      $(".oes-carousel ul.oes-carousel-bottom-nav li.slider_1").addClass(
        "ui-tabs-active"
      );
  
      $(document).on("click", ".oes-carousel-side-nav", function () {
        console.log("first " + curSlide);
        var getLength = $("ul.oes-carousel-bottom-nav > li").length;
  
        if ($(this).hasClass("right")) {
          console.log("Right Arrow");
          if (curSlide == 1) {
            $(".oes-carousel-cnt").hide();
            console.log("first ", curSlide);
            curSlide = parseInt(curSlide) + 1;
            $("#oes-carousel-1-section-" + curSlide).show();
          } else if (curSlide > 1 || curSlide <= getLength) {
            $(".oes-carousel-cnt").hide();
            console.log("second ", curSlide);
  
            if (curSlide == getLength) {
              console.log("second if ", curSlide);
            } else {
              curSlide = parseInt(curSlide) + 1;
              console.log("second else ", curSlide);
            }
            $("#oes-carousel-1-section-" + curSlide).show();
          } else {
            console.log("Right arrow else");
          }
          dotClass(parseInt(curSlide));
        } else if ($(this).hasClass("left")) {
          if (curSlide <= getLength) {
            if (curSlide == 1) {
            } else {
              $(".oes-carousel-cnt").hide();
              curSlide = parseInt(curSlide) - 1;
            }
            $("#oes-carousel-1-section-" + curSlide).show();
          }
          dotClass(parseInt(curSlide));
        }
      });
  
      $(document).on("click", ".oes-carousel-bottom-nav li a", function () {
        $(".oes-carousel-cnt").hide();
        var _getCurSlidNo = $(this).attr("data-section-select");
        var getSliderLen = $("ul.oes-carousel-bottom-nav > li").length;
        curSlide = parseInt(_getCurSlidNo);
        $("#oes-carousel-1-section-" + curSlide).show();
        dotClass(parseInt(curSlide));
      });
  
      function dotClass(aNumber) {
        console.log(aNumber);
        $(".oes-carousel ul.oes-carousel-bottom-nav li.slider").removeClass(
          "ui-tabs-active"
        );
        $(
          ".oes-carousel ul.oes-carousel-bottom-nav li.slider_" + aNumber
        ).addClass("ui-tabs-active");
      }
    });
  }
  

  function targetBlank() {
    // remove subdomain of current site's url and setup regex
    var internal = location.host.replace("www.", "");
    internal = new RegExp(internal, "i");
  
    var a = document.getElementsByTagName("a"); // then, grab every link on the page
    for (var i = 0; i < a.length; i++) {
      var href = a[i].host; // set the host of each link
      if (!internal.test(href)) {
        // make sure the href doesn't contain current site's host
        a[i].setAttribute("target", "_blank"); // if it doesn't, set attributes
      }
    }
  }
  
  function initULOContent() {
    var _popupTxt = "";
    //var _popupTxt = "<p>Students who successfully complete this unit will be able to:</p><ol> <li>description for LO1</li> <li>description for LO2</li> <li>description for LO3</li> <li>description for LO4</li> <li>description for LO5.</li> </ol>";
    var e = "",
      t = !0;
    $(".oes-ulo-list").each(function () {
      $(this).html(e);
    }),
      $(".oes-ulo-link").each(function () {
        var _getTitle = $(this).attr("title");
        _popupTxt = getPopupTxt(_getTitle);
        var i = e;
        $(this).attr("href", "#"),
          $(this).on("click", function (e) {
            var t = $(".oes-ulo-link").index($(this));
            e.preventDefault();
            var n = "This activity supports " + $(this).html(),
              a = $(this)
                .attr("class")
                .toUpperCase()
                .match(/LO[0-9]{1,2}/g);
            (a = null != a ? a.toString().replace(/,/g, " ") : "LOALL"),
              $(
                '<div id="dialog-ULO-' +
                  t +
                  '" role="dialog" class="dialog-ULO ' +
                  a +
                  '" title="' +
                  n +
                  '">' +
                  _popupTxt +
                  "</div>"
              ).dialog({
                resizable: !1,
                height: "auto",
                closeOnEscape: !0,
                width: "50%",
                modal: !0,
                position: { at: "center center" },
                buttons: [
                  {
                    text: "Close",
                    click: function () {
                      $(this).dialog("close");
                    },
                  },
                ],
              });
          });
      }),
      $(".oes-ulo-list, .oes-ulo-link").css("visibility", "visible");
  }
  
  
  // ******************************* LEARNING OUTCOMES ******************************* //
  // Get the modal
  function getPopupTxt(aCourse) {
    if (aCourse == "course0week0") {
      _popText =
        "<p>Students who successfully complete this unit will be able to:</p><ol> " +
        "<li>description for LO1</li> " +
        "<li>description for LO2</li> " +
        "<li>description for LO3</li> " +
        "<li>description for LO4</li> " +
        "<li>description for LO5.</li> " +
        "</ol>";
    }
    // Course 1
    else if (aCourse == "course1") {
      _popText =
        "<p></p><ol> " +
        "<li>Identify, source and perform basic cleansing on data from various, relevant sources to support required analysis processes</li> " +
        "<li>Conduct exploratory and descriptive analytics</li> " +
        "<li>Establish and utilise databases to support data management and analysis</li> " +
        "<li>Prepare relevant insights to support business decision making, including identifying areas for further analysis and exploration</li> " +
        "<li>Effectively communicate justified, relevant and useful insights to critical business stakeholders</li> " +
        "<li>Identify appropriate opportunities for business value through data analytics processes</li> " +
        "</ol>";
    } else if (aCourse == "course1week1") {
      _popText =
        "<p></p><ol> " +
        "<li>Identify your career satisfaction drivers through self-reflection and developing a career vision statement</li> " +
        "<li>Build on career goals through future visioning to build confidence and reposition how you see yourself</li> " +
        "<li>Develop a career roadmap to define a pathway to achieving goals</li> " +
        "<li>Reflect and identify macro and micro barriers and limitations to obtaining career goals</li> " +
        "<li>Create a strategy to overcome career barriers and limitations</li> " +
        "<li>Build and expand your professional portfolio to demonstrate skills and experience to industry.</li> " +
        "</ol>";
    } 
    return _popText;
  }
  
  function initInlineQuiz() {
    var e = 0;
    function t(e) {
      for (var t = e.length - 1; t > 0; t--) {
        var i = Math.floor(Math.random() * (t + 1)),
          n = e[t];
        (e[t] = e[i]), (e[i] = n);
      }
      return e;
    }
    $(".oes-canvas-quiz").each(function (i) {
      var n = $(this),
        a = $.extend(
          {
            id: ".oes-canvas-quiz",
            select_message: "Select an option",
            separator: ",",
          },
          i
        ),
        o = {
          links: {
            mc: ".oes-quiz-multichoice",
            fib: ".oes-quiz-fillinblank",
            fibtf: ".oes-quiz-fillinblank-textfields",
            tr: ".oes-quiz-textresponse",
            match: ".oes-quiz-matching",
            question: ".oes-quiz-question",
            resetBtn: ".reset-button",
            checkBtn: ".check-button",
          },
          mc_questions: [],
          fib_questions: [],
          fibtf_questions: [],
          tr_questions: [],
        };
      $(".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect").css(
        "opacity",
        1
      ),
        $(
          ".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect"
        ).fadeOut(0),
        $(
          ".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect, .oes-quiz-buttons .reset-button"
        ).hide(),
        n.data("oes-quiz-setting-separator") &&
          (a.separator = n.data("oes-quiz-setting-separator"));
      var r = 0,
        s = 0,
        l = 0;
      !(function () {
        $(o.links.resetBtn, n).length > 0
          ? $(o.links.resetBtn, n).addClass("oes-quiz-button")
          : n.append(
              "<p class='oes-quiz-buttons'><button class='reset-button oes-quiz-button'>Reset</button></p>"
            );
        setTimeout(function () {
          n.on("click", o.links.resetBtn, function () {
            $(".oes-feedback-context", n).remove(),
              $(this).hide(0),
              o.mc_questions.length > 0 ||
              o.tr_questions.length > 0 ||
              o.fibtf_questions.length > 0
                ? $(o.links.checkBtn, n).show(0)
                : $(o.links.checkBtn, n).hide(0),
              $(n).find("> .oes-feedback").hide("slow"),
              $(".oes-correct", n).removeClass("oes-correct"),
              $(".oes-incorrect", n).removeClass("oes-incorrect"),
              $(n).find("> .oes-feedback-correct").fadeOut("slow"),
              $(n).find("> .oes-feedback-incorrect").fadeOut("slow");
          });
        }, 0),
          $(o.links.resetBtn, n).hide(0);
      })(),
        (function () {
          $(o.links.checkBtn, n).length > 0
            ? $(o.links.checkBtn, n).addClass("oes-quiz-button")
            : $(".oes-quiz-buttons", n).prepend(
                "<button class='check-button oes-quiz-button'>Check</button>"
              );
          $(o.links.checkBtn, n).hide(0),
            setTimeout(function () {
              n.on("click", o.links.checkBtn, function () {
                l <= 0 &&
                  ($(this).hide(0),
                  $("> .oes-feedback", n).show("slow"),
                  $(".oes-quiz-question", n).length == $(".oes-correct", n).length
                    ? $(n).find("> .oes-feedback-correct").show("slow")
                    : $(".oes-quiz-question", n).length ==
                        $(".oes-correct", n).length +
                          $(".oes-incorrect", n).length &&
                      $(n).find("> .oes-feedback-incorrect").show("slow")),
                  $(o.links.resetBtn, n).show(0),
                  (l = 0);
              });
            }, 0);
        })(),
        $(o.links.mc, n).each(function () {
          s = 0;
          var t = $(this);
          t.attr("id", "oes-mc-q" + r), t.addClass("oes-quiz-question");
          var i = $("ul li:contains('*')", t).length > 1 ? "checkbox" : "radio";
          $("ul:contains('*')", $(this)).each(function () {
            var t = $(this);
            t.addClass("oes-selector-group"),
              $("li", t).each(function () {
                var t = $(this),
                  n = -1 !== t.text().indexOf("*") ? "true" : "";
                t.addClass("oes-selector"),
                  t.wrapInner(
                    "<label for='oes-" + e + "-mc-q" + r + "e" + s + "'></label>"
                  ),
                  $("label", t).prepend(
                    "<input name='s" +
                      r +
                      "' id='oes-" +
                      e +
                      "-mc-q" +
                      r +
                      "e" +
                      s +
                      "' value='s" +
                      r +
                      "e" +
                      s +
                      "' type='" +
                      i +
                      "' class='" +
                      n +
                      "' />&nbsp;"
                  ),
                  s++,
                  t.html(t.html().replace("*", ""));
              });
          }),
            r++;
        }),
        (o.mc_questions = $(o.links.mc, n)),
        n.on("click", o.links.resetBtn, function () {
          $(".oes-mc-checked", n).removeClass("oes-mc-checked"),
            $(".oes-mc-correct", n).removeClass("oes-mc-correct"),
            $(".oes-mc-incorrect", n).removeClass("oes-mc-incorrect"),
            $(".oes-mc-missed", n).removeClass("oes-mc-missed");
          for (var e = 0, t = o.mc_questions.length; e < t; e++) {
            var i = o.mc_questions[e];
            $(
              ".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect",
              i
            ).fadeOut(500),
              $(":checked", i).prop("checked", !1),
              $("input", i).prop("disabled", "");
          }
        }),
        n.on("click", o.links.checkBtn, function () {
          if (o.mc_questions.length > 0) {
            for (var e = 0, t = o.mc_questions.length; e < t; e++) {
              var i = o.mc_questions[e];
              if ($(":checked", i).length >= 1) {
                var a = $(".true:checked", i),
                  r = $(".true", i).length;
                $(i).addClass("oes-mc-checked"),
                  $("input", i).prop("disabled", "disable"),
                  $(
                    ".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect",
                    i
                  ).fadeOut(0),
                  a.length == r
                    ? ($(i).removeClass("oes-incorrect"),
                      $(i).addClass("oes-correct"))
                    : ($(i).removeClass("oes-correct"),
                      $(i).addClass("oes-incorrect")),
                  $("> .oes-feedback", $(":checked", i).parent()).fadeIn("slow"),
                  $(i).hasClass("no-feedback") ||
                    (a.parent().addClass("oes-mc-correct"),
                    $(":checked:not(:checked.true)", i)
                      .parent()
                      .addClass("oes-mc-incorrect"),
                    $(".true:not(:checked)", i)
                      .parent()
                      .addClass("oes-mc-missed"),
                    $(
                      "> .oes-correct-feedback",
                      $(".oes-mc-correct", i).parent()
                    ).fadeIn("slow"),
                    $(
                      "> .oes-incorrect-feedback",
                      $(".oes-mc-incorrect", i).parent()
                    ).fadeIn("slow"),
                    $(
                      "> .oes-feedback, > .oes-feedback-correct, > .oes-feedback-incorrect",
                      i
                    ).fadeOut(0),
                    a.length == r
                      ? ($("> .oes-feedback, > .oes-feedback-correct", i).fadeIn(
                          "slow"
                        ),
                        $("> .oes-feedback-incorrect", i).fadeOut(0))
                      : ($(
                          "> .oes-feedback, > .oes-feedback-incorrect",
                          i
                        ).fadeIn("slow"),
                        $("> .oes-feedback-correct", i).fadeOut(0)));
              } else l++;
            }
            l <= 0 && $(this).hide(0), $(o.links.resetBtn, n).show(0);
          }
        }),
        o.mc_questions.length > 0 && $(o.links.checkBtn, n).show(0),
        $(o.links.tr, n).each(function () {
          var e = $(this);
          (s = 0),
            e.attr("id", "oes-tr-q" + r),
            e.html(function (e, t) {
              return t.replace(
                /\[TEXTAREA=?(.*)?\]/g,
                '<textarea placeholder="$1"></textarea>'
              );
            }),
            e.html(function (e, t) {
              return t.replace(/\[OUTPUT=?(.*)?\]/g, function (e, t) {
                return t
                  ? '<div oes-output-for="' +
                      t +
                      '" class="oes-response-output"></div>'
                  : '<div class="oes-response-output"></div>';
              });
            }),
            $("textarea", e).each(function () {
              var e = $(this);
              e.addClass("oes-textarea"),
                e.attr("id", "oes-tr-q" + r + "e" + s),
                e.on("change keyup paste", function () {
                  $(o.links.checkBtn, n).is(":visible") ||
                    $(o.links.checkBtn, n).show("slow"),
                    $(o.links.resetBtn, n).is(":visible") ||
                      $(o.links.resetBtn, n).show("slow");
                }),
                s++;
            }),
            r++;
        }),
        (o.tr_questions = $(o.links.tr, n)),
        n.on("click", o.links.resetBtn, function () {
          for (var e = 0, t = o.tr_questions.length; e < t; e++) {
            var i = o.tr_questions[e];
            $(
              ".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect",
              i
            ).fadeOut(500),
              $("textarea", i).prop("disabled", "").val("").show(500);
          }
        }),
        n.on("click", o.links.checkBtn, function (e) {
          if (o.tr_questions.length > 0) {
            for (var t = 0, i = o.tr_questions.length; t < i; t++) {
              var a = $(o.tr_questions[t]),
                r = !!a.hasClass("not-required"),
                s = $("textarea", a),
                c = ($(".oes-feedback", a), $(".oes-response-output", a));
              n.find(".oes-quiz-textresponse").hasClass("no-blanks")
                ? n.find("span.oes-feedback-incorrect").remove()
                : (r = !0);
              for (var d = 0, u = s.length; d < u; d++) {
                var h = $(s[d]);
                "" !== $.trim(h.val())
                  ? h
                      .prop("disabled", "disable")
                      .filter(function () {
                        return !$(this).prev().hasClass("oes-feedback-context");
                      })
                      .before(
                        "<div class='oes-feedback-context'>Your response:</div>"
                      )
                  : r
                  ? h.prop("disabled", "disable").filter(function () {
                      return !$(this).prev().hasClass("oes-feedback-context");
                    })
                  : (l++,
                    n.find(".oes-quiz-textresponse").hasClass("no-blanks") &&
                      (h.after(
                        "<span class='oes-feedback-incorrect'>This response is empty.</span>"
                      ),
                      h
                        .parent()
                        .find("span.oes-feedback-incorrect")
                        .css("opacity", 1)
                        .fadeIn()));
              }
              if (l <= 0) {
                if ($(".oes-response-output", a).length > 0)
                  for (d = 0, u = c.length; d < u; d++) {
                    var f = $(c[d]),
                      p = f.attr("oes-output-for")
                        ? Number(f.attr("oes-output-for")) - 1
                        : d;
                    if (p < s.length) {
                      var g =
                        "" !== $.trim($(s[p]).val())
                          ? $(s[p])
                              .val()
                              .replace(/</g, "&lt;")
                              .replace(/>/g, "&gt;")
                              .replace(/\n|\r/g, "<br />")
                          : "&nbsp;";
                      f.html(g);
                    }
                  }
                $(".oes-feedback", a).fadeIn(500);
              }
            }
            l <= 0 && $(this).hide(0), $(o.links.resetBtn, n).show(0);
          }
        }),
        o.tr_questions.length > 0 && $(o.links.checkBtn, n).show(0),
        $(o.links.fib, n).each(function () {
          s = 0;
          var e = $(this);
          e.addClass("oes-quiz-question"),
            $(
              ".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect",
              e
            ).fadeOut(0);
          var t = e.html().match(/{([^}]+)}/g);
          if ((t = null == t ? [] : t).length > 0) {
            e.attr("id", "oes-fibtf-q" + r),
              e.addClass(o.links.fibtf.replace(/\./g, ""));
            for (var i = 0, n = t.length; i < n; i++) {
              var l = t[i]
                  .toString()
                  .replace(/&nbsp;/g, " ")
                  .replace("}", "")
                  .replace("{", "")
                  .split(a.separator)
                  .map(function (e) {
                    return e.trim();
                  })
                  .sort(function (e, t) {
                    return t.length - e.length;
                  }),
                c =
                  "<input id='oes-fibtf-q" +
                  r +
                  "s" +
                  i +
                  "' size='" +
                  l[0].length +
                  "' type='textfield' data-oes-answers='" +
                  l.join(a.separator) +
                  "'></input>";
              e.html(e.html().replace(t[i], c));
            }
          }
          r++;
        }),
        (o.fibtf_questions = $(o.links.fibtf, n)),
        n.on("click", o.links.resetBtn, function () {
          $(".oes-fibtf-checked", n).removeClass("oes-fibtf-checked"),
            $(".oes-fibtf-correct", n).removeClass("oes-fibtf-correct"),
            $(".oes-fibtf-incorrect", n).removeClass("oes-fibtf-incorrect"),
            $("input[type=textfield].true", n).removeClass("true"),
            $("input[type=textfield].false", n).removeClass("false"),
            $(".oes-fibtf-context").remove();
          for (var e = 0, t = o.fibtf_questions.length; e < t; e++) {
            var i = o.fibtf_questions[e];
            $(
              ".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect",
              i
            ).fadeOut(500);
          }
        }),
        n.on("click", o.links.checkBtn, function () {
          if (o.fibtf_questions.length > 0) {
            for (var e = 0, t = 0, i = o.fibtf_questions.length; t < i; t++) {
              (e = 0), (tempNumCorrect = 0), (tempNumIncorrect = 0);
              for (
                var r = 0,
                  s = $(o.fibtf_questions[t]),
                  c = $("input[type=textfield]", s),
                  d = 0,
                  u = c.length;
                d < u;
                d++
              ) {
                var h = $(c[d]);
                if ((e++, "" != h.val())) {
                  if (!h.hasClass("oes-fibtf-checked")) {
                    var f =
                      ".oes-feedback-for-" +
                      (Number(h.attr("id").split("s").pop()) + 1);
                    h.prop("disabled", "disable"),
                      h.addClass("oes-fibtf-checked");
                    for (
                      var p = h
                          .data("oes-answers")
                          .toString()
                          .replace(/&nbsp;/g, " ")
                          .replace("}", "")
                          .replace("{", "")
                          .split(a.separator)
                          .map(function (e) {
                            return e.trim();
                          }),
                        g = !0,
                        m = h,
                        v =
                          $.inArray(h.val().toString().toLowerCase().trim(), p) >=
                          0
                            ? ".oes-feedback, .oes-feedback-correct"
                            : ".oes-feedback, .oes-feedback-incorrect";
                      g;
  
                    )
                      m
                        .next()
                        .is(
                          ".oes-feedback, .oes-feedback-incorrect, .oes-feedback-correct"
                        )
                        ? (m.next().is(v) &&
                            m.next().fadeOut(0).css("opacity", 1).fadeIn("slow"),
                          (m = m.next()))
                        : (g = !1);
                    $.inArray(h.val().toString().toLowerCase().trim(), p) >= 0
                      ? (h.addClass("true"),
                        h.after(
                          "<span class='oes-fibtf-correct oes-fibtf-context'>&#x2713</span>"
                        ),
                        $(
                          ".oes-feedback" + f + ", .oes-feedback-correct" + f,
                          $(s)
                        ).fadeIn("slow"),
                        tempNumCorrect++)
                      : (h.addClass("false"),
                        h.after(
                          "<span class='oes-fibtf-incorrect oes-fibtf-context'>&#x274c " +
                            p.join(", ") +
                            "</span>"
                        ),
                        $(
                          ".oes-feedback" + f + ", .oes-feedback-incorrect" + f,
                          $(s)
                        ).fadeIn("slow"),
                        tempNumIncorrect++);
                  }
                } else r++, l++;
              }
              e == tempNumCorrect && e == tempNumIncorrect + tempNumCorrect
                ? (s.removeClass("oes-incorrect"), s.addClass("oes-correct"))
                : e > 0 &&
                  e > tempNumCorrect &&
                  e == tempNumIncorrect + tempNumCorrect &&
                  (s.removeClass("oes-correct"), s.addClass("oes-incorrect")),
                r <= 0 &&
                  (tempNumIncorrect <= 0
                    ? $(".oes-feedback, .oes-feedback-correct", s).show("slow")
                    : $(".oes-feedback, .oes-feedback-incorrect", s).show(
                        "slow"
                      ));
            }
            l <= 0 && $(this).hide(0), $(o.links.resetBtn, n).show(0);
          }
        }),
        o.fibtf_questions.length > 0 && $(o.links.checkBtn, n).show(0),
        $(o.links.fib, n).each(function () {
          s = 0;
          var i = $(this),
            l = 0,
            c = 0;
          i.attr("id", "oes-fib-q" + r), i.addClass("oes-quiz-question");
          var d = i.clone();
          d.find(".oes-feedback").remove();
          for (
            var u = d.html().match(/[^[\]]+(?=])/g),
              h = 0,
              f = (u = null == u ? [] : u).length;
            h < f;
            h++
          ) {
            var p = u[h].split(a.separator);
            i.hasClass("oes-quiz-shuffle") && (p = t(p));
            var g = "<select id='oes-fib-id" + e + "-q" + r + "s" + s + "'>";
            g +=
              "<option id='oes-feedback-select' value='select'>" +
              a.select_message +
              "</option>";
            for (var m = 0, v = p.length; m < v; m++) {
              var b = -1 !== p[m].indexOf("*") ? "true" : "";
              g +=
                "<option id='q" +
                r +
                "s" +
                s +
                "o" +
                m +
                "' value='q" +
                r +
                "s" +
                s +
                "o" +
                m +
                "' class='" +
                b +
                "'>" +
                p[m].trim() +
                "</option>";
            }
            (g += "</select>"),
              i.html(i.html().replace("[" + u[h] + "]", g)),
              $(i).on(
                "change",
                "#oes-fib-id" + e + "-q" + r + "s" + s,
                function () {
                  var e = $(this);
                  if ("select" != e.val()) {
                    var t = $("option:selected", e),
                      a = e.attr("id"),
                      r = $("option.true", e)
                        .map(function () {
                          return this.text;
                        })
                        .get()
                        .join(", "),
                      s =
                        ".oes-feedback-for-" +
                        (Number(e.attr("id").split("s").pop()) + 1);
                    $(
                      ".oes-feedback" + s + ", .oes-feedback-correct" + s,
                      $(i)
                    ).fadeOut(0),
                      $(
                        ".oes-feedback" + s + ", .oes-feedback-incorrect" + s,
                        $(i)
                      ).fadeOut(0),
                      e.addClass("oes-fib-selected"),
                      $("#oes-feedback-" + a).remove(),
                      $(this).parent().hasClass("no-feedback") ||
                        (t.hasClass("true")
                          ? (e.after(
                              "<span id='oes-feedback-" +
                                a +
                                "' class='oes-feedback-correct oes-feedback-context'>&#x2713;</span>"
                            ),
                            $(
                              ".oes-feedback" + s + ", .oes-feedback-correct" + s,
                              $(i)
                            ).fadeIn("slow"),
                            e.removeClass("oes-fib-incorrect"),
                            e.addClass("oes-fib-correct"))
                          : (e.after(
                              "<span id='oes-feedback-" +
                                a +
                                "' class='oes-feedback-incorrect oes-feedback-context'>&#x274c;&nbsp;" +
                                r +
                                "</span>"
                            ),
                            $(
                              ".oes-feedback" +
                                s +
                                ", .oes-feedback-incorrect" +
                                s,
                              $(i)
                            ).fadeIn("slow"),
                            e.removeClass("oes-fib-correct"),
                            e.addClass("oes-fib-incorrect")));
                    for (
                      var d = !0,
                        u = e,
                        h = t.hasClass("true")
                          ? ".oes-feedback, .oes-feedback-correct"
                          : ".oes-feedback, .oes-feedback-incorrect";
                      d;
  
                    )
                      u
                        .next()
                        .is(
                          ".oes-feedback, .oes-feedback-incorrect, .oes-feedback-correct"
                        )
                        ? (u.next().is(h)
                            ? u.next().fadeOut(0).css("opacity", 1).fadeIn("slow")
                            : u.next().fadeOut(0),
                          (u = u.next()))
                        : (d = !1);
                  } else
                    e.removeClass("oes-fib-selected"),
                      e.removeClass("oes-fib-correct"),
                      e.removeClass("oes-fib-incorrect");
                  (tempNumTotal = $("select", i).length),
                    (l = $(".oes-fib-selected", i).length),
                    (c = $(".oes-fib-correct", i).length),
                    $(".oes-fib-incorrect", i).length,
                    $(o.links.resetBtn, n).show(0),
                    l == c && l > 0 && tempNumTotal == l
                      ? (i.removeClass("oes-incorrect"),
                        i.addClass("oes-correct"),
                        $("> .oes-feedback, > .oes-feedback-correct", i).fadeIn(
                          500
                        ))
                      : l > 0 &&
                        l > c &&
                        tempNumTotal == l &&
                        (i.removeClass("oes-correct"),
                        i.addClass("oes-incorrect"),
                        $("> .oes-feedback, > .oes-feedback-incorrect", i).fadeIn(
                          500
                        ));
                }
              ),
              s++;
          }
          i.html(i.html().replace(/\*/g, "")), r++;
        }),
        (o.fib_questions = $(o.links.fib, n)),
        n.on("click", o.links.resetBtn, function () {
          for (var e = 0, t = o.fib_questions.length; e < t; e++) {
            var i = o.fib_questions[e];
            $(
              ".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect",
              i
            ).fadeOut(500),
              $("select", i)
                .removeClass("oes-fib-selected oes-fib-correct oes-fib-incorrect")
                .val("select"),
              $(".oes-feedback-context", i).remove(),
              $(i).removeClass("oes-incorrect, oes-correct"),
              $("input[type=textfield]", i).prop("disabled", "").val("");
          }
        }),
        $(o.links.match, n).each(function () {
          s = 0;
          var i = $(this);
          i.attr("id", "oes-match-q" + r), i.addClass("oes-quiz-question");
          for (
            var l = i.html().match(/[^[\]]+(?=])/g),
              c = 0,
              d = (l = null == l ? [] : l).length;
            c < d;
            c++
          ) {
            var u = l[c].split(a.separator);
            i.hasClass("oes-quiz-shuffle") && (u = t(u));
            var h = "<select id='oes-match-id" + e + "-q" + r + "s" + s + "'>";
            h +=
              "<option id='oes-feedback-select' value='select'>" +
              a.select_message +
              "</option>";
            for (var f = 0, p = u.length; f < p; f++) {
              var g = -1 !== u[f].indexOf("*") ? "true" : "";
              h +=
                "<option id='q" +
                r +
                "s" +
                s +
                "o" +
                f +
                "' value='q" +
                r +
                "s" +
                s +
                "o" +
                f +
                "' class='" +
                g +
                "'>" +
                u[f].trim() +
                "</option>";
            }
            (h += "</select>"),
              i.html(i.html().replace("[" + l[c] + "]", h)),
              $(i).on(
                "change",
                "#oes-match-id" + e + "-q" + r + "s" + s,
                function () {
                  var e = $(this);
                  "select" != e.val() && ($("option:selected", e), e.attr("id")),
                    $(o.links.checkBtn, n).show(0),
                    $(o.links.resetBtn, n).show(0);
                }
              ),
              s++;
          }
          i.html(i.html().replace(/\*/g, "")), r++;
        }),
        (o.match_questions = $(o.links.match, n)),
        n.on("click", o.links.resetBtn, function () {
          for (var e = 0, t = o.match_questions.length; e < t; e++) {
            var i = o.match_questions[e];
            $(
              ".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect",
              i
            ).fadeOut(500),
              $("select", i).prop("disabled", "").val(""),
              $("select", i).removeClass("disabled"),
              $("select", i).val("select");
          }
        }),
        n.on("click", o.links.checkBtn, function () {
          if (o.match_questions.length > 0)
            for (
              var e = 0, t = 0, i = 0, a = 0, r = 0, s = o.match_questions.length;
              r < s;
              r++
            ) {
              (e = 0), (t = 0), (i = 0), (a = 0);
              for (
                var c = $(o.match_questions[r]), d = 0, u = $("select", c).length;
                d < u;
                d++
              ) {
                var h = $($("select", c)[d]);
                if ("select" != h.val()) {
                  var f = $("option:selected", h),
                    p = h.attr("id"),
                    g = $("option.true", h)
                      .map(function () {
                        return this.text;
                      })
                      .get()
                      .join(", "),
                    m =
                      ".oes-feedback-for-" +
                      (Number(h.attr("id").split("s").pop()) + 1);
                  h.prop("disabled", "disable"),
                    h.addClass("disabled"),
                    $("#oes-feedback-" + p).remove(),
                    e++,
                    f.hasClass("true")
                      ? (h.after(
                          "<span id='oes-feedback-" +
                            p +
                            "' class='oes-feedback-correct'>&#x2713;</span>"
                        ),
                        $(
                          ".oes-feedback" + m + ", .oes-feedback-correct" + m,
                          $(c)
                        ).fadeIn("slow"),
                        t++)
                      : (h.after(
                          "<span id='oes-feedback-" +
                            p +
                            "' class='oes-feedback-incorrect'>&#x274c;&nbsp;" +
                            g +
                            "</span>"
                        ),
                        $(
                          ".oes-feedback" + m + ", .oes-feedback-incorrect" + m,
                          $(c)
                        ).fadeIn("slow"),
                        i++);
                  for (
                    var v = !0,
                      b = h,
                      y = f.hasClass("true")
                        ? ".oes-feedback, .oes-feedback-correct"
                        : ".oes-feedback, .oes-feedback-incorrect";
                    v;
  
                  )
                    b
                      .next()
                      .is(
                        ".oes-feedback, .oes-feedback-incorrect, .oes-feedback-correct"
                      )
                      ? (b.next().is(y) &&
                          b.next().fadeOut(0).css("opacity", 1).fadeIn("slow"),
                        (b = b.next()))
                      : (v = !1);
                }
              }
              (a = $("select", c).length),
                $(
                  "> .oes-feedback, > .oes-feedback-correct, > .oes-feedback-incorrect",
                  c
                ).fadeOut(0),
                a == t && e > 0 && a == t + i
                  ? (c.removeClass("oes-incorrect"),
                    c.addClass("oes-correct"),
                    $("> .oes-feedback, > .oes-feedback-correct", c).fadeIn(
                      "slow"
                    ),
                    $("> .oes-feedback-incorrect", c).fadeOut(0))
                  : e > 0 &&
                    a > t &&
                    a == t + i &&
                    (c.removeClass("oes-correct"),
                    c.addClass("oes-incorrect"),
                    $("> .oes-feedback, > .oes-feedback-incorrect", c).fadeIn(
                      "slow"
                    ),
                    $("> .oes-feedback-correct", c).fadeOut(0));
            }
          o.match_questions.length > 0 &&
            (l <= 0 && $(this).hide(0), $(o.links.resetBtn, n).show(0));
        }),
        o.match_questions.length > 0 && $(o.links.checkBtn, n).show(0),
        (o.links.checklist = ".oes-quiz-checklist"),
        (o.checklist_questions = []),
        $(o.links.checklist, n).each(function () {
          s = 0;
          var t = $(this);
          t.attr("id", "oes-checklist-oes-" + e + "q" + r),
            t.addClass("oes-quiz-question"),
            $("ul:contains('*')", $(this)).each(function () {
              var t = $(this);
              t.addClass("oes-selector-group"),
                $("li", t).each(function () {
                  var t = $(this),
                    i = -1 !== t.text().indexOf("*") ? "true" : "";
                  t.addClass("oes-selector"),
                    t.wrapInner(
                      "<label for='oes-" +
                        e +
                        "-checklist-q" +
                        r +
                        "e" +
                        s +
                        "'></label>"
                    ),
                    $("label", t).prepend(
                      "<input name='s" +
                        r +
                        "' id='oes-" +
                        e +
                        "-checklist-q" +
                        r +
                        "e" +
                        s +
                        "' value='s" +
                        r +
                        "e" +
                        s +
                        "' type='checkbox' class='oes-quiz-checkbox " +
                        i +
                        "' />&nbsp;"
                    ),
                    s++,
                    t.html(t.html().replace("*", ""));
                }),
                t.append(
                  '<div class="oes-progressbar ui-progressbar ui-widget ui-widget-content ui-corner-all" style="width: 100%;" role="progressbar" aria-valuemax="100" aria-valuemin="0" aria-valuenow="0"><span class="oes-progressbar-percentage">0%</span><div class="ui-progressbar-value ui-widget-header ui-corner-left" style="width: 0%;"></div></div>'
                );
            }),
            $("input[type=checkbox].true", t).change(function () {
              var e = $(this),
                i = $("input[type=checkbox].true", t).length,
                n = $("input[type=checkbox]:checked.true", t).length,
                a = Math.round((n / i) * 100);
              $(".ui-progressbar-value", e.closest(".oes-selector-group")).css(
                "width",
                a + "%"
              ),
                $(".oes-progressbar", e.closest(".oes-selector-group")).attr(
                  "aria-valuenow",
                  a
                ),
                $(
                  ".oes-progressbar .oes-progressbar-percentage",
                  e.closest(".oes-selector-group")
                ).html(a + "%"),
                n == i
                  ? ($(
                      ".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect",
                      t
                    ).fadeOut(0),
                    $(".oes-feedback, .oes-feedback-correct", t).fadeIn("slow"),
                    $(".oes-feedback-incorrect", t).fadeOut(0))
                  : ($(
                      ".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect",
                      t
                    ).fadeOut(0),
                    $(".oes-feedback-incorrect", t).fadeIn("slow"));
            }),
            r++;
        }),
        (o.checklist_questions = $(o.links.checklist, n)),
        n.on("click", o.links.resetBtn, function () {
          $(".oes-checklist-checked", n).removeClass("oes-checklist-checked"),
            $(".oes-checklist-correct", n).removeClass("oes-checklist-correct"),
            $(".oes-checklist-incorrect", n).removeClass(
              "oes-checklist-incorrect"
            ),
            $(".oes-checklist-missed", n).removeClass("oes-checklist-missed");
          for (var e = 0, t = o.checklist_questions.length; e < t; e++) {
            var i = o.checklist_questions[e];
            $(
              ".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect",
              i
            ).fadeOut(500),
              $(":checked", i).prop("checked", !1),
              $("input", i).prop("disabled", ""),
              $(".oes-progressbar", i).attr("aria-valuenow", 0),
              $(".ui-progressbar-value", i).css("width", "0%"),
              $(".oes-progressbar .oes-progressbar-percentage", i).html("0%");
          }
        }),
        e++;
    }),
      jQuery.isFunction($.fn.shuffle) ||
        ($.fn.shuffle = function () {
          $.each(this.get(), function (e, t) {
            var i = $(t),
              n = i.children();
            n.sort(function () {
              return 0.5 - Math.random();
            }),
              i.empty(),
              n.appendTo(i);
          });
        }),
      $(".oes-shuffle").shuffle();
  }
  initInlineQuiz();
  
  function initTab() {
    var acc = document.getElementsByClassName("accordion-demo");
    var i;
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        panel.classList.remove("open");
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
          panel.classList.remove("open");
        } else {
          panel.classList.add("open");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }
  
  const allPageImages = document.querySelectorAll(
    ".show-content.user_content img"
  );
  if (allPageImages.length > 0) {
    for (let i = 0; i < allPageImages.length; i++) {
      if (allPageImages[i].classList.contains("no-hover-zoom")) {
        continue;
      }
      if (allPageImages[i].parentNode.tagName === "a") {
        continue;
      }
      const imageContainer = document.createElement("span");
      imageContainer.style.backgroundImage = `url(${allPageImages[i].src})`;
        imageContainer.style.maxWidth = '900px';
        imageContainer.style.height = 'auto';
        imageContainer.style.overflow = 'hidden';
        imageContainer.className = 'image-hover-zoom';
        imageContainer.dataset.options = 'zoomPosition: inner';
  
      const copyOfImage = allPageImages[i].cloneNode(true);
      copyOfImage.className = "hover-image";
      const imagePosition = Array.prototype.indexOf.call(
        allPageImages[i].parentNode.children,
        allPageImages[i]
      );
  
      allPageImages[i].parentNode.insertBefore(
        imageContainer,
        allPageImages[i].parentNode.children[imagePosition]
      );
      imageContainer.appendChild(copyOfImage);
      allPageImages[i].remove();
  
      imageContainer.addEventListener("mousemove", (e) => {
        imageContainer.style.backgroundPositionX = -e.offsetX + "px";
        imageContainer.style.backgroundPositionY = -e.offsetY + "px";
      });
    }
  }
  
  // ******************************* POPUP BLOCK ******************************* //
  ///popup code block
  var trigger = document.getElementById("popup");
  if (trigger) {
    var href = trigger.href;
    window.name = "parent";
    function popup() {
      var pop = window.open(
        href,
        "popup",
        "menubar=no, status=no, scrollbars=no, menubar=no, width=800, height=800"
      );
      pop.focus();
    }
    trigger.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        e.stopPropagation();
        popup();
      },
      true
    );
  }
  
  // ******************************* TRANSCRIPT MODAL ******************************* //
  // Get the modal
  var modal = document.getElementById("myModal");
  // Get the image and insert it inside the modal - use its "alt" text as a caption
  var img = document.getElementById("myImg");
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");
  if (img) {
    img.onclick = function () {
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
    };
  }
  
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  // When the user clicks on <span> (x), close the modal
  
  if (span) {
    span.onclick = function () {
      modal.style.display = "none";
    };
  }
  
  var slideIndex = 1;
  showSlides(slideIndex);
  
  // ******************************* NEXT / PREVIOUS CONTROLS ******************************* //
  function plusSlides(n) {
    showSlides((slideIndex += n));
  }
  // Thumbnail image controls
  function currentSlide(n) {
    showSlides((slideIndex = n));
  }
  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }
  function myFunction() {
    var dots = document.getElementsByClassName("dots");
    var moreText = document.getElementsByClassName("more");
    var btnText = document.getElementsByClassName("myBtn");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.style.display = "inline";
    }
  }
  
  document
    .querySelector(".show-more-button")
    .addEventListener("click", function () {
      // If text is shown less, then show complete
      if (this.getAttribute("data-more") == 0) {
        this.setAttribute("data-more", 1);
        this.style.display = "block";
        this.innerHTML = "Read Less";
  
        this.previousElementSibling.style.display = "none";
        this.previousElementSibling.previousElementSibling.style.display =
          "inline";
      }
      // If text is shown complete, then show less
      else if (this.getAttribute("data-more") == 1) {
        this.setAttribute("data-more", 0);
        this.style.display = "inline";
        this.innerHTML = "Read More";
  
        this.previousElementSibling.style.display = "inline";
        this.previousElementSibling.previousElementSibling.style.display = "none";
      }
    });
  

    function receiveMessage(event) {
      if (event.data && event.data.type && event.data.type === 'LOREE_WINDOW_SIZE' && event.data.height) {
          var frames = document.getElementsByTagName('iframe');
          for (var frame of frames) {
              if (frame.src && frame.contentWindow === event.source && frame.src.startsWith(event.data.url)) {
                  frame.style.height = event.data.height.toString() + "px";
              }
          }
      }
  
      if (event.data && event.data.type && event.data.type === 'LOREE_HOST') {
          const hostname = window.location.hostname
          const allowedH5pDomains = ['loree-h5p.crystaldelta.net', 'loree-h5p-dev.crystaldelta.net']
          const iframes = document.getElementsByTagName('iframe');
          for (var iframe of iframes) {
              var valid = false;
              allowedH5pDomains.forEach(function (domain) {
                  if (iframe.src.includes(domain)) valid = true;
              })
              if (valid) {
                  const data = {
                      type: 'h5p-domain',
                      domain: hostname
                  }
                  iframe.contentWindow.postMessage(data, '*')
              }
          }
      }
  }