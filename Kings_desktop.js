window.onload = function () {    //loads with page to account for Canvas loading JS first

    //Global Javascript

    var acc = document.getElementsByClassName("accordion");
    //console.log(acc);
    var i;
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            //console.log(this);
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


    /*let accordion = document.getElementsByClassName("accordion");
    let i;

    for (i = 0; i < accordion.length; i++) {
        accordion[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight){
        panel.style.maxHeight = null;
        } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}*/

    popupHeadingUpdate();
    initTab();
    initCarousels();
    //carouselsInit();
    initULOContent();
    //getPopupTxt();


}



function popupHeadingUpdate() {
    $(".transcript-button").click(function () {
        var _getHeading = $(this).attr("title");
        var _gethref = $(this).attr("href");

        //$('#mydialog').dialog('option','width',200);
        setTimeout(function () {
            $(".ui-dialog .ui-dialog-titlebar span.ui-dialog-title").html(_getHeading);
            //$(".ui-dialog-content .ui-dialog-titlebar").find("span.ui-dialog-title").text('Transcript');
        }, 300);
    });
}


function carouselsInit() {
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
        //let height = theSlides[0].height;
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
}

function initCarousels() {
    console.log("Loading Carousel");
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
                $(this).prepend('<a class="oes-carousel-side-nav left leftArrow"><i class="icon-arrow-open-left"></i></a>'),
                $(this).prepend('<a class="oes-carousel-side-nav right rightArrow"><i class="icon-arrow-open-right"></i></a>');
            var t = 0;
            $(this)
                .find("> div")
                .each(function () {
                    t++,
                        $(this).prop("class", "oes-carousel-cnt").prop("id", "oes-carousel-" + e + "-section-" + t),
                        $(this)
                            .parent()
                            .find("ul.oes-carousel-bottom-nav")
                            .append('<li class="slider_' + t + ' slider"><a data-section-select="' + t + '" class="dots" id="' + $(this).prop("id") + '" href="javascript:void(0)"></a></li>'),
                        $(this).wrapInner('<div class="oes-carousel-section-content"></div>');
                }),
                //$(this).tabs(),
                $(this).css("visibility", "visible"),
                $(this).find("> ul.oes-carousel-bottom-nav").insertAfter($(this).find("> div").last()),
                $(this).trigger($.Event("resize")),
                $(this)
                    .find("> ul.oes-carousel-bottom-nav > li a")
                    .bind("click", function (e) {
                        $(this).trigger($.Event("resize"));
                    });
        }

        $("#oes-carousel-1-section-" + curSlide).show();
        $(".oes-carousel ul.oes-carousel-bottom-nav li.slider_1").addClass("ui-tabs-active");

        $(document).on("click", ".oes-carousel-side-nav", function () {

            console.log("first " + curSlide);
            var getLength = $("ul.oes-carousel-bottom-nav > li").length;

            if ($(this).hasClass("right")) {
                console.log("Right Arrow");
                //if(!$(this).hasClass("disabledCls")){
                if (curSlide == 1) {
                    $(".oes-carousel-cnt").hide();
                    console.log("first ", curSlide);
                    curSlide = parseInt(curSlide) + 1;
                    //$(".oes-carousel a.leftArrow").addClass("disabledCls");
                    //$(".oes-carousel a.rightArrow").removeClass("disabledCls");
                    $("#oes-carousel-1-section-" + curSlide).show();
                } else if ((curSlide > 1) || (curSlide <= getLength)) {
                    $(".oes-carousel-cnt").hide();
                    console.log("second ", curSlide)

                    if (curSlide == getLength) {
                        console.log("second if ", curSlide);
                        //$(".oes-carousel a.rightArrow").removeClass("disabledCls").addClass("disabledCls");
                        //$(".oes-carousel a.leftArrow").removeClass("disabledCls");
                    } else {
                        curSlide = parseInt(curSlide) + 1;
                        console.log("second else ", curSlide);

                        //$(".oes-carousel a.rightArrow").removeClass("disabledCls");
                        //$(".oes-carousel a.leftArrow").removeClass("disabledCls");

                    }
                    $("#oes-carousel-1-section-" + curSlide).show();

                } else {
                    console.log("Right arrow else");
                }
                dotClass(parseInt(curSlide));
                //}
            } else if ($(this).hasClass("left")) {
                //if(!$(this).hasClass("disabledCls")){
                if (curSlide <= getLength) {
                    if (curSlide == 1) {
                        //$(".oes-carousel a.leftArrow").removeClass("disabledCls").addClass("disabledCls");
                        //$(".oes-carousel a.rightArrow").removeClass("disabledCls");
                    } else {
                        $(".oes-carousel-cnt").hide();
                        curSlide = parseInt(curSlide) - 1;
                        //$(".oes-carousel a.rightArrow").removeClass("disabledCls");
                        //$(".oes-carousel a.leftArrow").removeClass("disabledCls");
                    }
                    $("#oes-carousel-1-section-" + curSlide).show();

                }
                dotClass(parseInt(curSlide));
                //}
            }
            /* e.preventDefault();
            var t,
                i = $(this).parent().find("ul.oes-carousel-bottom-nav > li").length,
                n = $($(this).parent().find("ul.oes-carousel-bottom-nav > li.ui-state-active a")).data("section-select");
                console.log(t,i,n)
            $(this).hasClass("right") ? (t = n < i ? n + 1 : 1) : $(this).hasClass("left") && (t = 1 == n ? i : n - 1),
                $(this)
                    .parent()
                    .find("> ul.oes-carousel-bottom-nav > li:nth-of-type(" + t + ") a")
                    .trigger("click");
            */
        });

        $(document).on("click", ".oes-carousel-bottom-nav li a", function () {
            $(".oes-carousel-cnt").hide();
            var _getCurSlidNo = $(this).attr("data-section-select");
            var getSliderLen = $("ul.oes-carousel-bottom-nav > li").length;
            curSlide = parseInt(_getCurSlidNo);
            //console.log(curSlide);
            /* if(curSlide ==1){
                $(".oes-carousel a.leftArrow").addClass("disabledCls");
                $(".oes-carousel a.rightArrow").removeClass("disabledCls");
            }else if(curSlide > 1 &&  curSlide < getSliderLen){
                $(".oes-carousel a.leftArrow").removeClass("disabledCls");
                $(".oes-carousel a.rightArrow").removeClass("disabledCls");
            }else if(curSlide == getSliderLen){
                $(".oes-carousel a.leftArrow").removeClass("disabledCls");
                $(".oes-carousel a.rightArrow").removeClass("disabledCls").addClass("disabledCls");
            } */
            $("#oes-carousel-1-section-" + curSlide).show();
            dotClass(parseInt(curSlide));
        });

        function dotClass(aNumber) {
            console.log(aNumber);
            $(".oes-carousel ul.oes-carousel-bottom-nav li.slider").removeClass("ui-tabs-active");
            $(".oes-carousel ul.oes-carousel-bottom-nav li.slider_" + aNumber).addClass("ui-tabs-active");
        }
    });
}



function initTabs() {
    observeDOM(".oes-tabs", function (e) {
        var t = $(".oes-tabs").index($(e));
        0 == $(this).find("> ul > li a").length && $(this).find("> ul > li").wrapInner('<a href="#"></a>');
        var i = 0;
        $(this)
            .find("> ul > li a")
            .each(function () {
                $(this).attr("href", "#oes-tabs-" + t + "-" + i),
                    $(this)
                        .parent()
                        .parent()
                        .parent()
                        .find("> div:eq(" + i + ")")
                        .prop("id", "oes-tabs-" + t + "-" + i),
                    i++;
            }),
            $(e).tabs(),
            $(e).css("visibility", "visible");
    });
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
            //$(this).attr("title", $(this).html()),
            $(this).attr("href", "#"),
                $(this).on("click", function (e) {
                    var t = $(".oes-ulo-link").index($(this));
                    e.preventDefault();
                    var n = "Related to " + $(this).html(),
                        a = $(this)
                            .attr("class")
                            .toUpperCase()
                            .match(/LO[0-9]{1,2}/g);
                    (a = null != a ? a.toString().replace(/,/g, " ") : "LOALL"),
                        $('<div id="dialog-ULO-' + t + '" role="dialog" class="dialog-ULO ' + a + '" title="' + n + '">' + _popupTxt + "</div>").dialog({
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
    //var _popText = "";
    if (aCourse == "course0module0") {
        _popText = "<p>Students who successfully complete this unit will be able to:</p><ol> " +
            "<li>description for LO1</li> " +
            "<li>description for LO2</li> " +
            "<li>description for LO3</li> " +
            "<li>description for LO4</li> " +
            "<li>description for LO5.</li> " +
            "</ol>";
    }
    // Orientation Course
    else if (aCourse == "orientationCourse") {
        _popText = "<p></p><ol> " +
            "<li>CLO1: Create an Agile product roadmap using product management software.</li> " +
            "<li>CLO2: Apply the principles of design thinking and UX design to create user-centric products that align with the product vision.</li> " +
            "<li>CLO3: Critically analyse wireframes and prototypes to improve the user experience and visual design.</li> " +
            "<li>CLO4: Select and use various testing methods to validate product design decisions.</li> " +
            "<li>CLO5: Use prioritisation techniques to manage and refine the product backlog.</li> " +
            "<li>CLO6: Adopt tailored communication strategies to manage varying stakeholders, requirements and product development phases.</li> " +
            "</ol>";
    }
    else if (aCourse == "orientationWeek1") {
        _popText = "<p></p><ol> " +
            "<li>Navigate the Career Accelerator platform to identify critical elements.</li> " +
            "<li>Create professional and personal development goals.</li> " +
            "<li>Apply reflective practices to develop self-leadership skills. </li> " +
            "<li>Create a professional portfolio.</li> " +
            "</ol>";
    }
    else if (aCourse == "orientationWeek2") {
        _popText = "<p></p><ol> " +
            "<li>Communicate with career coach and success manager to articulate learner goals and how to achieve them.</li> " +
            "<li>Identify how to evaluate goal progression using tools and frameworks.</li> " +
            "<li>Draft a goal attainment plan in consultation with a career coach/success manager.</li> " +
            "</ol>";
    }
    // Course 1
    else if (aCourse == "course1") {
        _popText = "<p></p><ol> " +
            "<li>Critically analyse the various roles and stakeholders within the product development environment and their relationship to achieving successful product design and delivery.</li> " +
            "<li>Evaluate product strategy and vision, and their relationship to organisational strategy and success.</li> " +
            "<li>Conduct exploratory market research and user research to validate product hypotheses and inform competitor analyses.</li> " +
            "<li>Identify, design and develop product concepts and user experiences to capitalise on opportunities based on specific organisational contexts.</li> " +
            "<li>Adopt tailored communication strategies to manage varying stakeholders, requirements and product development phases.</li> " +
            "</ol>";
    }
    else if (aCourse == "course1week1") {
        _popText = "<p></p><ol> " +
            "<li>Evaluate the strategic importance of product management roles within specific organisational contexts. </li> " +
            "<li>Compare and evaluate products by type and audience to inform decision-making.</li> " +
            "<li>Categorise stakeholders using a power-interest matrix to communicate how different stakeholders contribute to a productâ€™s success.</li> " +
            "</ol>";
    }
    else if (aCourse == "course1week2") {
        _popText = "<p></p><ol> " +
            "<li>Analyse market research and trends to inform product strategy and positioning.</li> " +
            "<li>Articulate product vision and mission to reflect the dynamic relationship between organisational strategy and product strategy.</li> " +
            "<li>Articulate the value proposition for a product in a specific context.</li> " +
            "<li>Formulate product goals that align to the broader organisational strategy.</li> " +
            "</ol>";
    }
    else if (aCourse == "course1week3") {
        _popText = "<p></p><ol> " +
            "<li>Create an empathy map and user journey map to gain deeper insights into users.</li> " +
            "<li>Apply the scientific method framework to inform user research and refine identified user needs.</li> " +
            "<li>Create a user research strategy informed by quantitative and qualitative data to guide product development.</li> " +
            "<li>Articulate and differentiate between user segments to inform product design.</li> " +
            "<li>Design personas to represent identified user segments to  support product development.</li> " +
            "</ol>";
    }
    else if (aCourse == "course1week4") {
        _popText = "<p></p><ol> " +
            "<li>Develop a product hypothesis that addresses the most valuable user problems.</li> " +
            "<li>Write problem statements to articulate user pain points.        </li> " +
            "<li>Select and apply ideation strategies within specific organisational contexts to optimise continuous discovery throughout the product development cycle.</li> " +
            "<li>Communicate product ideas to different audiences using a low-fidelity prototype.</li> " +
            "</ol>";
    }
    else if (aCourse == "course1week5") {
        _popText = "<p></p><ol> " +
            "<li>Validate and refine product hypotheses using best practice evaluation methods.</li> " +
            "<li>Create a risk management plan to evaluate and manage product risk.</li> " +
            "<li>Write high-level user stories to communicate product requirements for a specific product feature.</li> " +
            "<li>Identify success criteria and metrics to define an MVP that contributes to organisational and product goals.</li> " +
            "<li>###</li> " +
            "</ol>";
    }
    else if (aCourse == "course1week6") {
        _popText = "<p></p><ol> " +
            "<li>Develop effective concept tests to validate product ideas.</li> " +
            "<li>Create a business case to gain buy-in for a product or feature proposal and respond to objections.</li> " +
            "<li>Develop and present a pitch promoting your product idea.</li> " +
            "</ol>";
    }
    // Course 2
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
            a = $.extend({ id: ".oes-canvas-quiz", select_message: "Select an option", separator: "," }, i),
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
        $(".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect").css("opacity", 1),
            $(".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect").fadeOut(0),
            $(".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect, .oes-quiz-buttons .reset-button").hide(),
            n.data("oes-quiz-setting-separator") && (a.separator = n.data("oes-quiz-setting-separator"));
        var r = 0,
            s = 0,
            l = 0;
        !(function () {
            $(o.links.resetBtn, n).length > 0 ? $(o.links.resetBtn, n).addClass("oes-quiz-button") : n.append("<p class='oes-quiz-buttons'><button class='reset-button oes-quiz-button'>Reset</button></p>");
            setTimeout(function () {
                n.on("click", o.links.resetBtn, function () {
                    $(".oes-feedback-context", n).remove(),
                        $(this).hide(0),
                        o.mc_questions.length > 0 || o.tr_questions.length > 0 || o.fibtf_questions.length > 0 ? $(o.links.checkBtn, n).show(0) : $(o.links.checkBtn, n).hide(0),
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
                $(o.links.checkBtn, n).length > 0 ? $(o.links.checkBtn, n).addClass("oes-quiz-button") : $(".oes-quiz-buttons", n).prepend("<button class='check-button oes-quiz-button'>Check</button>");
                $(o.links.checkBtn, n).hide(0),
                    setTimeout(function () {
                        n.on("click", o.links.checkBtn, function () {
                            l <= 0 &&
                                ($(this).hide(0),
                                    $("> .oes-feedback", n).show("slow"),
                                    $(".oes-quiz-question", n).length == $(".oes-correct", n).length
                                        ? $(n).find("> .oes-feedback-correct").show("slow")
                                        : $(".oes-quiz-question", n).length == $(".oes-correct", n).length + $(".oes-incorrect", n).length && $(n).find("> .oes-feedback-incorrect").show("slow")),
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
                                t.wrapInner("<label for='oes-" + e + "-mc-q" + r + "e" + s + "'></label>"),
                                $("label", t).prepend("<input name='s" + r + "' id='oes-" + e + "-mc-q" + r + "e" + s + "' value='s" + r + "e" + s + "' type='" + i + "' class='" + n + "' />&nbsp;"),
                                s++,
                                t.html(t.html().replace("*", ""));
                        });
                }),
                    r++;
            }),
            (o.mc_questions = $(o.links.mc, n)),
            n.on("click", o.links.resetBtn, function () {
                $(".oes-mc-checked", n).removeClass("oes-mc-checked"), $(".oes-mc-correct", n).removeClass("oes-mc-correct"), $(".oes-mc-incorrect", n).removeClass("oes-mc-incorrect"), $(".oes-mc-missed", n).removeClass("oes-mc-missed");
                for (var e = 0, t = o.mc_questions.length; e < t; e++) {
                    var i = o.mc_questions[e];
                    $(".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect", i).fadeOut(500), $(":checked", i).prop("checked", !1), $("input", i).prop("disabled", "");
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
                                $(".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect", i).fadeOut(0),
                                a.length == r ? ($(i).removeClass("oes-incorrect"), $(i).addClass("oes-correct")) : ($(i).removeClass("oes-correct"), $(i).addClass("oes-incorrect")),
                                $("> .oes-feedback", $(":checked", i).parent()).fadeIn("slow"),
                                $(i).hasClass("no-feedback") ||
                                (a.parent().addClass("oes-mc-correct"),
                                    $(":checked:not(:checked.true)", i).parent().addClass("oes-mc-incorrect"),
                                    $(".true:not(:checked)", i).parent().addClass("oes-mc-missed"),
                                    $("> .oes-correct-feedback", $(".oes-mc-correct", i).parent()).fadeIn("slow"),
                                    $("> .oes-incorrect-feedback", $(".oes-mc-incorrect", i).parent()).fadeIn("slow"),
                                    $("> .oes-feedback, > .oes-feedback-correct, > .oes-feedback-incorrect", i).fadeOut(0),
                                    a.length == r
                                        ? ($("> .oes-feedback, > .oes-feedback-correct", i).fadeIn("slow"), $("> .oes-feedback-incorrect", i).fadeOut(0))
                                        : ($("> .oes-feedback, > .oes-feedback-incorrect", i).fadeIn("slow"), $("> .oes-feedback-correct", i).fadeOut(0)));
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
                        return t.replace(/\[TEXTAREA=?(.*)?\]/g, '<textarea placeholder="$1"></textarea>');
                    }),
                    e.html(function (e, t) {
                        return t.replace(/\[OUTPUT=?(.*)?\]/g, function (e, t) {
                            return t ? '<div oes-output-for="' + t + '" class="oes-response-output"></div>' : '<div class="oes-response-output"></div>';
                        });
                    }),
                    $("textarea", e).each(function () {
                        var e = $(this);
                        e.addClass("oes-textarea"),
                            e.attr("id", "oes-tr-q" + r + "e" + s),
                            e.on("change keyup paste", function () {
                                $(o.links.checkBtn, n).is(":visible") || $(o.links.checkBtn, n).show("slow"), $(o.links.resetBtn, n).is(":visible") || $(o.links.resetBtn, n).show("slow");
                            }),
                            s++;
                    }),
                    r++;
            }),
            (o.tr_questions = $(o.links.tr, n)),
            n.on("click", o.links.resetBtn, function () {
                for (var e = 0, t = o.tr_questions.length; e < t; e++) {
                    var i = o.tr_questions[e];
                    $(".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect", i).fadeOut(500), $("textarea", i).prop("disabled", "").val("").show(500);
                }
            }),
            n.on("click", o.links.checkBtn, function (e) {
                if (o.tr_questions.length > 0) {
                    for (var t = 0, i = o.tr_questions.length; t < i; t++) {
                        var a = $(o.tr_questions[t]),
                            r = !!a.hasClass("not-required"),
                            s = $("textarea", a),
                            c = ($(".oes-feedback", a), $(".oes-response-output", a));
                        n.find(".oes-quiz-textresponse").hasClass("no-blanks") ? n.find("span.oes-feedback-incorrect").remove() : (r = !0);
                        for (var d = 0, u = s.length; d < u; d++) {
                            var h = $(s[d]);
                            "" !== $.trim(h.val())
                                ? h
                                    .prop("disabled", "disable")
                                    .filter(function () {
                                        return !$(this).prev().hasClass("oes-feedback-context");
                                    })
                                    .before("<div class='oes-feedback-context'>Your response:</div>")
                                : r
                                    ? h.prop("disabled", "disable").filter(function () {
                                        return !$(this).prev().hasClass("oes-feedback-context");
                                    })
                                    : (l++,
                                        n.find(".oes-quiz-textresponse").hasClass("no-blanks") &&
                                        (h.after("<span class='oes-feedback-incorrect'>This response is empty.</span>"), h.parent().find("span.oes-feedback-incorrect").css("opacity", 1).fadeIn()));
                        }
                        if (l <= 0) {
                            if ($(".oes-response-output", a).length > 0)
                                for (d = 0, u = c.length; d < u; d++) {
                                    var f = $(c[d]),
                                        p = f.attr("oes-output-for") ? Number(f.attr("oes-output-for")) - 1 : d;
                                    if (p < s.length) {
                                        var g = "" !== $.trim($(s[p]).val()) ? $(s[p]).val().replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n|\r/g, "<br />") : "&nbsp;";
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
                e.addClass("oes-quiz-question"), $(".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect", e).fadeOut(0);
                var t = e.html().match(/{([^}]+)}/g);
                if ((t = null == t ? [] : t).length > 0) {
                    e.attr("id", "oes-fibtf-q" + r), e.addClass(o.links.fibtf.replace(/\./g, ""));
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
                            c = "<input id='oes-fibtf-q" + r + "s" + i + "' size='" + l[0].length + "' type='textfield' data-oes-answers='" + l.join(a.separator) + "'></input>";
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
                    $(".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect", i).fadeOut(500);
                }
            }),
            n.on("click", o.links.checkBtn, function () {
                if (o.fibtf_questions.length > 0) {
                    for (var e = 0, t = 0, i = o.fibtf_questions.length; t < i; t++) {
                        (e = 0), (tempNumCorrect = 0), (tempNumIncorrect = 0);
                        for (var r = 0, s = $(o.fibtf_questions[t]), c = $("input[type=textfield]", s), d = 0, u = c.length; d < u; d++) {
                            var h = $(c[d]);
                            if ((e++, "" != h.val())) {
                                if (!h.hasClass("oes-fibtf-checked")) {
                                    var f = ".oes-feedback-for-" + (Number(h.attr("id").split("s").pop()) + 1);
                                    h.prop("disabled", "disable"), h.addClass("oes-fibtf-checked");
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
                                        v = $.inArray(h.val().toString().toLowerCase().trim(), p) >= 0 ? ".oes-feedback, .oes-feedback-correct" : ".oes-feedback, .oes-feedback-incorrect";
                                        g;

                                    )
                                        m.next().is(".oes-feedback, .oes-feedback-incorrect, .oes-feedback-correct") ? (m.next().is(v) && m.next().fadeOut(0).css("opacity", 1).fadeIn("slow"), (m = m.next())) : (g = !1);
                                    $.inArray(h.val().toString().toLowerCase().trim(), p) >= 0
                                        ? (h.addClass("true"), h.after("<span class='oes-fibtf-correct oes-fibtf-context'>&#x2713</span>"), $(".oes-feedback" + f + ", .oes-feedback-correct" + f, $(s)).fadeIn("slow"), tempNumCorrect++)
                                        : (h.addClass("false"),
                                            h.after("<span class='oes-fibtf-incorrect oes-fibtf-context'>&#x274c " + p.join(", ") + "</span>"),
                                            $(".oes-feedback" + f + ", .oes-feedback-incorrect" + f, $(s)).fadeIn("slow"),
                                            tempNumIncorrect++);
                                }
                            } else r++, l++;
                        }
                        e == tempNumCorrect && e == tempNumIncorrect + tempNumCorrect
                            ? (s.removeClass("oes-incorrect"), s.addClass("oes-correct"))
                            : e > 0 && e > tempNumCorrect && e == tempNumIncorrect + tempNumCorrect && (s.removeClass("oes-correct"), s.addClass("oes-incorrect")),
                            r <= 0 && (tempNumIncorrect <= 0 ? $(".oes-feedback, .oes-feedback-correct", s).show("slow") : $(".oes-feedback, .oes-feedback-incorrect", s).show("slow"));
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
                for (var u = d.html().match(/[^[\]]+(?=])/g), h = 0, f = (u = null == u ? [] : u).length; h < f; h++) {
                    var p = u[h].split(a.separator);
                    i.hasClass("oes-quiz-shuffle") && (p = t(p));
                    var g = "<select id='oes-fib-id" + e + "-q" + r + "s" + s + "'>";
                    g += "<option id='oes-feedback-select' value='select'>" + a.select_message + "</option>";
                    for (var m = 0, v = p.length; m < v; m++) {
                        var b = -1 !== p[m].indexOf("*") ? "true" : "";
                        g += "<option id='q" + r + "s" + s + "o" + m + "' value='q" + r + "s" + s + "o" + m + "' class='" + b + "'>" + p[m].trim() + "</option>";
                    }
                    (g += "</select>"),
                        i.html(i.html().replace("[" + u[h] + "]", g)),
                        $(i).on("change", "#oes-fib-id" + e + "-q" + r + "s" + s, function () {
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
                                    s = ".oes-feedback-for-" + (Number(e.attr("id").split("s").pop()) + 1);
                                $(".oes-feedback" + s + ", .oes-feedback-correct" + s, $(i)).fadeOut(0),
                                    $(".oes-feedback" + s + ", .oes-feedback-incorrect" + s, $(i)).fadeOut(0),
                                    e.addClass("oes-fib-selected"),
                                    $("#oes-feedback-" + a).remove(),
                                    $(this).parent().hasClass("no-feedback") ||
                                    (t.hasClass("true")
                                        ? (e.after("<span id='oes-feedback-" + a + "' class='oes-feedback-correct oes-feedback-context'>&#x2713;</span>"),
                                            $(".oes-feedback" + s + ", .oes-feedback-correct" + s, $(i)).fadeIn("slow"),
                                            e.removeClass("oes-fib-incorrect"),
                                            e.addClass("oes-fib-correct"))
                                        : (e.after("<span id='oes-feedback-" + a + "' class='oes-feedback-incorrect oes-feedback-context'>&#x274c;&nbsp;" + r + "</span>"),
                                            $(".oes-feedback" + s + ", .oes-feedback-incorrect" + s, $(i)).fadeIn("slow"),
                                            e.removeClass("oes-fib-correct"),
                                            e.addClass("oes-fib-incorrect")));
                                for (var d = !0, u = e, h = t.hasClass("true") ? ".oes-feedback, .oes-feedback-correct" : ".oes-feedback, .oes-feedback-incorrect"; d;)
                                    u.next().is(".oes-feedback, .oes-feedback-incorrect, .oes-feedback-correct") ? (u.next().is(h) ? u.next().fadeOut(0).css("opacity", 1).fadeIn("slow") : u.next().fadeOut(0), (u = u.next())) : (d = !1);
                            } else e.removeClass("oes-fib-selected"), e.removeClass("oes-fib-correct"), e.removeClass("oes-fib-incorrect");
                            (tempNumTotal = $("select", i).length),
                                (l = $(".oes-fib-selected", i).length),
                                (c = $(".oes-fib-correct", i).length),
                                $(".oes-fib-incorrect", i).length,
                                $(o.links.resetBtn, n).show(0),
                                l == c && l > 0 && tempNumTotal == l
                                    ? (i.removeClass("oes-incorrect"), i.addClass("oes-correct"), $("> .oes-feedback, > .oes-feedback-correct", i).fadeIn(500))
                                    : l > 0 && l > c && tempNumTotal == l && (i.removeClass("oes-correct"), i.addClass("oes-incorrect"), $("> .oes-feedback, > .oes-feedback-incorrect", i).fadeIn(500));
                        }),
                        s++;
                }
                i.html(i.html().replace(/\*/g, "")), r++;
            }),
            (o.fib_questions = $(o.links.fib, n)),
            n.on("click", o.links.resetBtn, function () {
                for (var e = 0, t = o.fib_questions.length; e < t; e++) {
                    var i = o.fib_questions[e];
                    $(".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect", i).fadeOut(500),
                        $("select", i).removeClass("oes-fib-selected oes-fib-correct oes-fib-incorrect").val("select"),
                        $(".oes-feedback-context", i).remove(),
                        $(i).removeClass("oes-incorrect, oes-correct"),
                        $("input[type=textfield]", i).prop("disabled", "").val("");
                }
            }),
            $(o.links.match, n).each(function () {
                s = 0;
                var i = $(this);
                i.attr("id", "oes-match-q" + r), i.addClass("oes-quiz-question");
                for (var l = i.html().match(/[^[\]]+(?=])/g), c = 0, d = (l = null == l ? [] : l).length; c < d; c++) {
                    var u = l[c].split(a.separator);
                    i.hasClass("oes-quiz-shuffle") && (u = t(u));
                    var h = "<select id='oes-match-id" + e + "-q" + r + "s" + s + "'>";
                    h += "<option id='oes-feedback-select' value='select'>" + a.select_message + "</option>";
                    for (var f = 0, p = u.length; f < p; f++) {
                        var g = -1 !== u[f].indexOf("*") ? "true" : "";
                        h += "<option id='q" + r + "s" + s + "o" + f + "' value='q" + r + "s" + s + "o" + f + "' class='" + g + "'>" + u[f].trim() + "</option>";
                    }
                    (h += "</select>"),
                        i.html(i.html().replace("[" + l[c] + "]", h)),
                        $(i).on("change", "#oes-match-id" + e + "-q" + r + "s" + s, function () {
                            var e = $(this);
                            "select" != e.val() && ($("option:selected", e), e.attr("id")), $(o.links.checkBtn, n).show(0), $(o.links.resetBtn, n).show(0);
                        }),
                        s++;
                }
                i.html(i.html().replace(/\*/g, "")), r++;
            }),
            (o.match_questions = $(o.links.match, n)),
            n.on("click", o.links.resetBtn, function () {
                for (var e = 0, t = o.match_questions.length; e < t; e++) {
                    var i = o.match_questions[e];
                    $(".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect", i).fadeOut(500), $("select", i).prop("disabled", "").val(""), $("select", i).removeClass("disabled"), $("select", i).val("select");
                }
            }),
            n.on("click", o.links.checkBtn, function () {
                if (o.match_questions.length > 0)
                    for (var e = 0, t = 0, i = 0, a = 0, r = 0, s = o.match_questions.length; r < s; r++) {
                        (e = 0), (t = 0), (i = 0), (a = 0);
                        for (var c = $(o.match_questions[r]), d = 0, u = $("select", c).length; d < u; d++) {
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
                                    m = ".oes-feedback-for-" + (Number(h.attr("id").split("s").pop()) + 1);
                                h.prop("disabled", "disable"),
                                    h.addClass("disabled"),
                                    $("#oes-feedback-" + p).remove(),
                                    e++,
                                    f.hasClass("true")
                                        ? (h.after("<span id='oes-feedback-" + p + "' class='oes-feedback-correct'>&#x2713;</span>"), $(".oes-feedback" + m + ", .oes-feedback-correct" + m, $(c)).fadeIn("slow"), t++)
                                        : (h.after("<span id='oes-feedback-" + p + "' class='oes-feedback-incorrect'>&#x274c;&nbsp;" + g + "</span>"), $(".oes-feedback" + m + ", .oes-feedback-incorrect" + m, $(c)).fadeIn("slow"), i++);
                                for (var v = !0, b = h, y = f.hasClass("true") ? ".oes-feedback, .oes-feedback-correct" : ".oes-feedback, .oes-feedback-incorrect"; v;)
                                    b.next().is(".oes-feedback, .oes-feedback-incorrect, .oes-feedback-correct") ? (b.next().is(y) && b.next().fadeOut(0).css("opacity", 1).fadeIn("slow"), (b = b.next())) : (v = !1);
                            }
                        }
                        (a = $("select", c).length),
                            $("> .oes-feedback, > .oes-feedback-correct, > .oes-feedback-incorrect", c).fadeOut(0),
                            a == t && e > 0 && a == t + i
                                ? (c.removeClass("oes-incorrect"), c.addClass("oes-correct"), $("> .oes-feedback, > .oes-feedback-correct", c).fadeIn("slow"), $("> .oes-feedback-incorrect", c).fadeOut(0))
                                : e > 0 && a > t && a == t + i && (c.removeClass("oes-correct"), c.addClass("oes-incorrect"), $("> .oes-feedback, > .oes-feedback-incorrect", c).fadeIn("slow"), $("> .oes-feedback-correct", c).fadeOut(0));
                    }
                o.match_questions.length > 0 && (l <= 0 && $(this).hide(0), $(o.links.resetBtn, n).show(0));
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
                                    t.wrapInner("<label for='oes-" + e + "-checklist-q" + r + "e" + s + "'></label>"),
                                    $("label", t).prepend("<input name='s" + r + "' id='oes-" + e + "-checklist-q" + r + "e" + s + "' value='s" + r + "e" + s + "' type='checkbox' class='oes-quiz-checkbox " + i + "' />&nbsp;"),
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
                        $(".ui-progressbar-value", e.closest(".oes-selector-group")).css("width", a + "%"),
                            $(".oes-progressbar", e.closest(".oes-selector-group")).attr("aria-valuenow", a),
                            $(".oes-progressbar .oes-progressbar-percentage", e.closest(".oes-selector-group")).html(a + "%"),
                            n == i
                                ? ($(".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect", t).fadeOut(0), $(".oes-feedback, .oes-feedback-correct", t).fadeIn("slow"), $(".oes-feedback-incorrect", t).fadeOut(0))
                                : ($(".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect", t).fadeOut(0), $(".oes-feedback-incorrect", t).fadeIn("slow"));
                    }),
                    r++;
            }),
            (o.checklist_questions = $(o.links.checklist, n)),
            n.on("click", o.links.resetBtn, function () {
                $(".oes-checklist-checked", n).removeClass("oes-checklist-checked"),
                    $(".oes-checklist-correct", n).removeClass("oes-checklist-correct"),
                    $(".oes-checklist-incorrect", n).removeClass("oes-checklist-incorrect"),
                    $(".oes-checklist-missed", n).removeClass("oes-checklist-missed");
                for (var e = 0, t = o.checklist_questions.length; e < t; e++) {
                    var i = o.checklist_questions[e];
                    $(".oes-feedback, .oes-feedback-correct, .oes-feedback-incorrect", i).fadeOut(500),
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
    '.show-content.user_content img'
);
if (allPageImages.length > 0) {
    for (let i = 0; i < allPageImages.length; i++) {
        if (allPageImages[i].classList.contains('no-hover-zoom')) {
            continue;
        }
        if (allPageImages[i].parentNode.tagName === 'a') {
            continue;
        }
        const imageContainer = document.createElement('span');
        imageContainer.style.backgroundImage = `url(${allPageImages[i].src})`;
        imageContainer.style.maxWidth = '900px';
        imageContainer.style.height = 'auto';
        imageContainer.style.overflow = 'hidden';
        imageContainer.className = 'image-hover-zoom';
        imageContainer.dataset.options = 'zoomPosition: inner';

        const copyOfImage = allPageImages[i].cloneNode(true);
        copyOfImage.className = 'hover-image';
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

        imageContainer.addEventListener('mousemove', (e) => {
            imageContainer.style.backgroundPositionX = e.offsetX + '%';
            imageContainer.style.backgroundPositionY = e.offsetY + '%';
        });
    }
}

/*const { img } = document;

let zoomActivated = false;

window.addEventListener('keydown', (e) => {
    if(e.key === 'z') {
        zoomActivated = !zoomActivated;
    }
});

window.addEventListener('mousemove', (e) => {
    const { clientX: x, clientY: y } = e;

    if(zoomActivated) {
        body.style.transform = 'scale(2)';
        body.style.transformOrigin = `${x}px ${y}px`;
    } else {
        body.style.transform = 'none';
    }
});*/


// ******************************* POPUP BLOCK ******************************* //
///popup code block
var trigger = document.getElementById('popup');
if (trigger) {
    var href = trigger.href;
    window.name = 'parent';
    function popup() {
        var pop = window.open(href, 'popup', 'menubar=no, status=no, scrollbars=no, menubar=no, width=800, height=800');
        pop.focus();
    }
    trigger.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        popup();
    }, true);
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
    }
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal

if (span) {
    span.onclick = function () {
        modal.style.display = "none";
    }
}

var slideIndex = 1;
//showSlides(slideIndex);

// ******************************* NEXT / PREVIOUS CONTROLS ******************************* //
function plusSlides(n) {
    showSlides(slideIndex += n);
}
// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    console.log(slides[slideIndex - 1]);
    if (slides[slideIndex - 1] != "undefined") {
        slides[slideIndex - 1].style.display = "block";
    }
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
//document.getElementsByClassName("show-more-button").addEventListener("click", function() {
//document.addEventListener('DOMContentLoaded', () => {

document.querySelector('.show-more-button').addEventListener('click', function () {
    // If text is shown less, then show complete
    if (this.getAttribute('data-more') == 0) {
        this.setAttribute('data-more', 1);
        this.style.display = 'block';
        this.innerHTML = 'Read Less';

        this.previousElementSibling.style.display = 'none';
        this.previousElementSibling.previousElementSibling.style.display = 'inline';
    }
    // If text is shown complete, then show less
    else if (this.getAttribute('data-more') == 1) {
        this.setAttribute('data-more', 0);
        this.style.display = 'inline';
        this.innerHTML = 'Read More';

        this.previousElementSibling.style.display = 'inline';
        this.previousElementSibling.previousElementSibling.style.display = 'none';
    }
});


//}
//});


/* Loree v1 custom JS */

var fontUrl = `https://fonts.googleapis.com/css?family=ABeeZee|Abel|Abhaya+Libre|Abril+Fatface|Aclonica|Acme|Actor|Adamina|Advent+Pro|Aguafina+Script|Akronim|Aladin|Aldrich|Alef|Alegreya|Alegreya+SC|Alegreya+Sans|Alegreya+Sans+SC|Aleo|Alex+Brush|Alfa+Slab+One|Alice|Alike|Alike+Angular|Allan|Allerta|Allerta+Stencil|Allura|Almarai|Almendra|Almendra+Display|Almendra+SC|Amarante|Amaranth|Amatic+SC|Amethysta|Amiko|Amiri|Amita|Anaheim|Andada|Andika|Angkor|Annie+Use+Your+Telescope|Anonymous+Pro|Antic|Antic+Didone|Antic+Slab|Anton|Arapey|Arbutus|Arbutus+Slab|Architects+Daughter|Archivo|Archivo+Black|Archivo+Narrow|Aref+Ruqaa|Arima+Madurai|Arimo|Arizonia|Armata|Arsenal|Artifika|Arvo|Arya|Asap|Asap+Condensed|Asar|Asset|Assistant|Astloch|Asul|Athiti|Atma|Atomic+Age|Aubrey|Audiowide|Autour+One|Average|Average+Sans|Averia+Gruesa+Libre|Averia+Libre|Averia+Sans+Libre|Averia+Serif+Libre|B612|B612+Mono|Bad+Script|Bahiana|Bahianita|Bai+Jamjuree|Baloo|Baloo+Bhai|Baloo+Bhaijaan|Baloo+Bhaina|Baloo+Chettan|Baloo+Da|Baloo+Paaji|Baloo+Tamma|Baloo+Tammudu|Baloo+Thambi|Balthazar|Bangers|Barlow|Barlow+Condensed|Barlow+Semi+Condensed|Barriecito|Barrio|Basic|Battambang|Baumans|Bayon|Be+Vietnam|Belgrano|Bellefair|Belleza|BenchNine|Bentham|Berkshire+Swash|Beth+Ellen|Bevan|Big+Shoulders+Display|Big+Shoulders+Text|Bigelow+Rules|Bigshot+One|Bilbo|Bilbo+Swash+Caps|BioRhyme|BioRhyme+Expanded|Biryani|Bitter|Black+And+White+Picture|Black+Han+Sans|Black+Ops+One|Blinker|Bokor|Bonbon|Boogaloo|Bowlby+One|Bowlby+One+SC|Brawler|Bree+Serif|Bubblegum+Sans|Bubbler+One|Buda|Buenard|Bungee|Bungee+Hairline|Bungee+Inline|Bungee+Outline|Bungee+Shade|Butcherman|Butterfly+Kids|Cabin|Cabin+Condensed|Cabin+Sketch|Caesar+Dressing|Cagliostro|Cairo|Calligraffitti|Cambay|Cambo|Candal|Cantarell|Cantata+One|Cantora+One|Capriola|Cardo|Carme|Carrois+Gothic|Carrois+Gothic+SC|Carter+One|Catamaran|Caudex|Caveat|Caveat+Brush|Cedarville+Cursive|Ceviche+One|Chakra+Petch|Changa|Changa+One|Chango|Charm|Charmonman|Chathura|Chau+Philomene+One|Chela+One|Chelsea+Market|Chenla|Cherry+Cream+Soda|Cherry+Swash|Chewy|Chicle|Chilanka|Chivo|Chonburi|Cinzel|Cinzel+Decorative|Clicker+Script|Coda|Coda+Caption|Codystar|Coiny|Combo|Comfortaa|Coming+Soon|Concert+One|Condiment|Content|Contrail+One|Convergence|Cookie|Copse|Corben|Cormorant|Cormorant+Garamond|Cormorant+Infant|Cormorant+SC|Cormorant+Unicase|Cormorant+Upright|Courgette|Cousine|Coustard|Covered+By+Your+Grace|Crafty+Girls|Creepster|Crete+Round|Crimson+Pro|Crimson+Text|Croissant+One|Crushed|Cuprum|Cute+Font|Cutive|Cutive+Mono|DM+Sans|DM+Serif+Display|DM+Serif+Text|Damion|Dancing+Script|Dangrek|Darker+Grotesque|David+Libre|Dawning+of+a+New+Day|Days+One|Dekko|Delius|Delius+Swash+Caps|Delius+Unicase|Della+Respira|Denk+One|Devonshire|Dhurjati|Didact+Gothic|Diplomata|Diplomata+SC|Do+Hyeon|Dokdo|Domine|Donegal+One|Doppio+One|Dorsa|Dosis|Dr+Sugiyama|Duru+Sans|Dynalight|EB+Garamond|Eagle+Lake|East+Sea+Dokdo|Eater|Economica|Eczar|El+Messiri|Electrolize|Elsie|Elsie+Swash+Caps|Emblema+One|Emilys+Candy|Encode+Sans|Encode+Sans+Condensed|Encode+Sans+Expanded|Encode+Sans+Semi+Condensed|Encode+Sans+Semi+Expanded|Engagement|Englebert|Enriqueta|Erica+One|Esteban|Euphoria+Script|Ewert|Exo|Exo+2|Expletus+Sans|Fahkwang|Fanwood+Text|Farro|Farsan|Fascinate|Fascinate+Inline|Faster+One|Fasthand|Fauna+One|Faustina|Federant|Federo|Felipa|Fenix|Finger+Paint|Fira+Code|Fira+Mono|Fira+Sans|Fira+Sans+Condensed|Fira+Sans+Extra+Condensed|Fjalla+One|Fjord+One|Flamenco|Flavors|Fondamento|Fontdiner+Swanky|Forum|Francois+One|Frank+Ruhl+Libre|Freckle+Face|Fredericka+the+Great|Fredoka+One|Freehand|Fresca|Frijole|Fruktur|Fugaz+One|GFS+Didot|GFS+Neohellenic|Gabriela|Gaegu|Gafata|Galada|Galdeano|Galindo|Gamja+Flower|Gayathri|Gentium+Basic|Gentium+Book+Basic|Geo|Geostar|Geostar+Fill|Germania+One|Gidugu|Gilda+Display|Give+You+Glory|Glass+Antiqua|Glegoo|Gloria+Hallelujah|Goblin+One|Gochi+Hand|Gorditas|Gothic+A1|Goudy+Bookletter+1911|Graduate|Grand+Hotel|Gravitas+One|Great+Vibes|Grenze|Griffy|Gruppo|Gudea|Gugi|Gurajada|Habibi|Halant|Hammersmith+One|Hanalei|Hanalei+Fill|Handlee|Hanuman|Happy+Monkey|Harmattan|Headland+One|Heebo|Henny+Penny|Hepta+Slab|Herr+Von+Muellerhoff|Hi+Melody|Hind|Hind+Guntur|Hind+Madurai|Hind+Siliguri|Hind+Vadodara|Holtwood+One+SC|Homemade+Apple|Homenaje|IBM+Plex+Mono|IBM+Plex+Sans|IBM+Plex+Sans+Condensed|IBM+Plex+Serif|IM+Fell+DW+Pica|IM+Fell+DW+Pica+SC|IM+Fell+Double+Pica|IM+Fell+Double+Pica+SC|IM+Fell+English|IM+Fell+English+SC|IM+Fell+French+Canon|IM+Fell+French+Canon+SC|IM+Fell+Great+Primer|IM+Fell+Great+Primer+SC|Iceberg|Iceland|Imprima|Inconsolata|Inder|Indie+Flower|Inika|Inknut+Antiqua|Irish+Grover|Istok+Web|Italiana|Italianno|Itim|Jacques+Francois|Jacques+Francois+Shadow|Jaldi|Jim+Nightshade|Jockey+One|Jolly+Lodger|Jomhuria|Josefin+Sans|Josefin+Slab|Joti+One|Jua|Judson|Julee|Julius+Sans+One|Junge|Jura|Just+Another+Hand|Just+Me+Again+Down+Here|K2D|Kadwa|Kalam|Kameron|Kanit|Kantumruy|Karla|Karma|Katibeh|Kaushan+Script|Kavivanar|Kavoon|Kdam+Thmor|Keania+One|Kelly+Slab|Kenia|Khand|Khmer|Khula|Kirang+Haerang|Kite+One|Knewave|KoHo|Kodchasan|Kosugi|Kosugi+Maru|Kotta+One|Koulen|Kranky|Kreon|Kristi|Krona+One|Krub|Kumar+One|Kumar+One+Outline|Kurale|La+Belle+Aurore|Lacquer|Laila|Lakki+Reddy|Lalezar|Lancelot|Lateef|Lato|League+Script|Leckerli+One|Ledger|Lekton|Lemon|Lemonada|Lexend+Deca|Lexend+Exa|Lexend+Giga|Lexend+Mega|Lexend+Peta|Lexend+Tera|Lexend+Zetta|Libre+Barcode+128|Libre+Barcode+128+Text|Libre+Barcode+39|Libre+Barcode+39+Extended|Libre+Barcode+39+Extended+Text|Libre+Barcode+39+Text|Libre+Baskerville|Libre+Caslon+Display|Libre+Caslon+Text|Libre+Franklin|Life+Savers|Lilita+One|Lily+Script+One|Limelight|Linden+Hill|Literata|Liu+Jian+Mao+Cao|Livvic|Lobster|Lobster+Two|Londrina+Outline|Londrina+Shadow|Londrina+Sketch|Londrina+Solid|Long+Cang|Lora|Love+Ya+Like+A+Sister|Loved+by+the+King|Lovers+Quarrel|Luckiest+Guy|Lusitana|Lustria|M+PLUS+1p|M+PLUS+Rounded+1c|Ma+Shan+Zheng|Macondo|Macondo+Swash+Caps|Mada|Magra|Maiden+Orange|Maitree|Major+Mono+Display|Mako|Mali|Mallanna|Mandali|Manjari|Mansalva|Manuale|Marcellus|Marcellus+SC|Marck+Script|Margarine|Markazi+Text|Marko+One|Marmelad|Martel|Martel+Sans|Marvel|Mate|Mate+SC|Maven+Pro|McLaren|Meddon|MedievalSharp|Medula+One|Meera+Inimai|Megrim|Meie+Script|Merienda|Merienda+One|Merriweather|Merriweather+Sans|Metal|Metal+Mania|Metamorphous|Metrophobic|Michroma|Milonga|Miltonian|Miltonian+Tattoo|Mina|Miniver|Miriam+Libre|Mirza|Miss+Fajardose|Mitr|Modak|Modern+Antiqua|Mogra|Molengo|Molle|Monda|Monofett|Monoton|Monsieur+La+Doulaise|Montaga|Montez|Montserrat|Montserrat+Alternates|Montserrat+Subrayada|Moul|Moulpali|Mountains+of+Christmas|Mouse+Memoirs|Mr+Bedfort|Mr+Dafoe|Mr+De+Haviland|Mrs+Saint+Delafield|Mrs+Sheppards|Mukta|Mukta+Mahee|Mukta+Malar|Mukta+Vaani|Muli|Mystery+Quest|NTR|Nanum+Brush+Script|Nanum+Gothic|Nanum+Gothic+Coding|Nanum+Myeongjo|Nanum+Pen+Script|Neucha|Neuton|New+Rocker|News+Cycle|Niconne|Niramit|Nixie+One|Nobile|Nokora|Norican|Nosifer|Notable|Nothing+You+Could+Do|Noticia+Text|Noto+Sans|Noto+Sans+HK|Noto+Sans+JP|Noto+Sans+KR|Noto+Sans+SC|Noto+Sans+TC|Noto+Serif|Noto+Serif+JP|Noto+Serif+KR|Noto+Serif+SC|Noto+Serif+TC|Nova+Cut|Nova+Flat|Nova+Mono|Nova+Oval|Nova+Round|Nova+Script|Nova+Slim|Nova+Square|Numans|Nunito|Nunito+Sans|Odor+Mean+Chey|Offside|Old+Standard+TT|Oldenburg|Oleo+Script|Oleo+Script+Swash+Caps|Open+Sans|Open+Sans+Condensed|Oranienbaum|Orbitron|Oregano|Orienta|Original+Surfer|Oswald|Over+the+Rainbow|Overlock|Overlock+SC|Overpass|Overpass+Mono|Ovo|Oxygen|Oxygen+Mono|PT+Mono|PT+Sans|PT+Sans+Caption|PT+Sans+Narrow|PT+Serif|PT+Serif+Caption|Pacifico|Padauk|Palanquin|Palanquin+Dark|Pangolin|Paprika|Parisienne|Passero+One|Passion+One|Pathway+Gothic+One|Patrick+Hand|Patrick+Hand+SC|Pattaya|Patua+One|Pavanam|Paytone+One|Peddana|Peralta|Permanent+Marker|Petit+Formal+Script|Petrona|Philosopher|Piedra|Pinyon+Script|Pirata+One|Plaster|Play|Playball|Playfair+Display|Playfair+Display+SC|Podkova|Poiret+One|Poller+One|Poly|Pompiere|Pontano+Sans|Poor+Story|Poppins|Port+Lligat+Sans|Port+Lligat+Slab|Pragati+Narrow|Prata|Preahvihear|Press+Start+2P|Pridi|Princess+Sofia|Prociono|Prompt|Prosto+One|Proza+Libre|Puritan|Purple+Purse|Quando|Quantico|Quattrocento|Quattrocento+Sans|Questrial|Quicksand|Quintessential|Qwigley|Racing+Sans+One|Radley|Rajdhani|Rakkas|Raleway|Raleway+Dots|Ramabhadra|Ramaraja|Rambla|Rammetto+One|Ranchers|Rancho|Ranga|Rasa|Rationale|Ravi+Prakash|Red+Hat+Display|Red+Hat+Text|Redressed|Reem+Kufi|Reenie+Beanie|Revalia|Rhodium+Libre|Ribeye|Ribeye+Marrow|Righteous|Risque|Roboto|Roboto+Condensed|Roboto+Mono|Roboto+Slab|Rochester|Rock+Salt|Rokkitt|Romanesco|Ropa+Sans|Rosario|Rosarivo|Rouge+Script|Rozha+One|Rubik|Rubik+Mono+One|Ruda|Rufina|Ruge+Boogie|Ruluko|Rum+Raisin|Ruslan+Display|Russo+One|Ruthie|Rye|Sacramento|Sahitya|Sail|Saira|Saira+Condensed|Saira+Extra+Condensed|Saira+Semi+Condensed|Saira+Stencil+One|Salsa|Sanchez|Sancreek|Sansita|Sarabun|Sarala|Sarina|Sarpanch|Satisfy|Sawarabi+Gothic|Sawarabi+Mincho|Scada|Scheherazade|Schoolbell|Scope+One|Seaweed+Script|Secular+One|Sedgwick+Ave|Sedgwick+Ave+Display|Sevillana|Seymour+One|Shadows+Into+Light|Shadows+Into+Light+Two|Shanti|Share|Share+Tech|Share+Tech+Mono|Shojumaru|Short+Stack|Shrikhand|Siemreap|Sigmar+One|Signika|Signika+Negative|Simonetta|Single+Day|Sintony|Sirin+Stencil|Six+Caps|Skranji|Slabo+13px|Slabo+27px|Slackey|Smokum|Smythe|Sniglet|Snippet|Snowburst+One|Sofadi+One|Sofia|Song+Myung|Sonsie+One|Sorts+Mill+Goudy|Source+Code+Pro|Source+Sans+Pro|Source+Serif+Pro|Space+Mono|Special+Elite|Spectral|Spectral+SC|Spicy+Rice|Spinnaker|Spirax|Squada+One|Sree+Krushnadevaraya|Sriracha|Srisakdi|Staatliches|Stalemate|Stalinist+One|Stardos+Stencil|Stint+Ultra+Condensed|Stint+Ultra+Expanded|Stoke|Strait|Stylish|Sue+Ellen+Francisco|Suez+One|Sumana|Sunflower|Sunshiney|Supermercado+One|Sura|Suranna|Suravaram|Suwannaphum|Swanky+and+Moo+Moo|Syncopate|Tajawal|Tangerine|Taprom|Tauri|Taviraj|Teko|Telex|Tenali+Ramakrishna|Tenor+Sans|Text+Me+One|Thasadith|The+Girl+Next+Door|Tienne|Tillana|Timmana|Tinos|Titan+One|Titillium+Web|Trade+Winds|Trirong|Trocchi|Trochut|Trykker|Tulpen+One|Turret+Road|Ubuntu|Ubuntu+Condensed|Ubuntu+Mono|Ultra|Uncial+Antiqua|Underdog|Unica+One|UnifrakturCook|UnifrakturMaguntia|Unkempt|Unlock|Unna|VT323|Vampiro+One|Varela|Varela+Round|Vast+Shadow|Vesper+Libre|Vibes|Vibur|Vidaloka|Viga|Voces|Volkhov|Vollkorn|Vollkorn+SC|Voltaire|Waiting+for+the+Sunrise|Wallpoet|Walter+Turncoat|Warnes|Wellfleet|Wendy+One|Wire+One|Work+Sans|Yanone+Kaffeesatz|Yantramanav|Yatra+One|Yellowtail|Yeon+Sung|Yeseva+One|Yesteryear|Yrsa|ZCOOL+KuaiLe|ZCOOL+QingKe+HuangYou|ZCOOL+XiaoWei|Zeyada|Zhi+Mang+Xing|Zilla+Slab|Zilla+Slab+Highlight&display=swap`;


// var linkTag = document.createElement('link');
// linkTag.setAttribute('rel', 'stylesheet');
// linkTag.setAttribute('href', fontUrl);
// document.getElementsByTagName('head')[0].appendChild(linkTag);


var linkTag = document.createElement('style');
linkTag.innerHTML = `@import url(${fontUrl})`;
document.getElementsByTagName('head')[0].appendChild(linkTag);

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}


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

function h5pIframeHeight() {
    var h5pScript = document.createElement('script');
    h5pScript.setAttribute('charset', 'UTF-8');
    h5pScript.setAttribute('src', 'https://loree-h5p.crystaldelta.net/wp-content/plugins/h5p/h5p-php-library/js/h5p-resizer.js');
    document.body.appendChild(h5pScript);
}

h5pIframeHeight();
window.addEventListener("message", receiveMessage, false);














