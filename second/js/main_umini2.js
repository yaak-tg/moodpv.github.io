/*

    ____  __  ______  __________  __  _______  _____ __  __
   / __ \/ / / / __ \/_  __/ __ \/  |/  / __ \/ ___// / / /
  / /_/ / /_/ / / / / / / / / / / /|_/ / / / /\__ \/ /_/ /
 / ____/ __  / /_/ / / / / /_/ / /  / / /_/ /___/ / __  /
/_/   /_/ /_/\____/ /_/  \____/_/  /_/\____//____/_/ /_/

PHOTOMOSH (c) 2018 by Airtight Interactive / Felix Turner
www.airtight.cc / @felixturner

*/

"use strict";
var MOSH = {
    VERSION: "1.0.0"
};
MOSH.events = new Events, MOSH.noise = new ImprovedNoise, MOSH.Main = function() {
    var o, t, r, l, n, v, i, u, a, s, c = new THREE.Vector2,
        f = {
            jpg: 2048,
            webm: 1280,
            gif: 640
        };

    function d() {
        if (MOSH.Input.getSourceReady()) {
            var e = MOSH.Input.getSourceSize(),
                o = e.x / e.y,
                t = f[MOSH.Recorder.getRecordMode()];
            c.copy(e), c.x = Math.round(c.x), c.y = Math.round(c.y), c.x > t && (c.x = t, c.y = Math.floor(t / o)), c.y > t && (c.y = t, c.x = Math.floor(t * o)), 0 < c.x && (l.aspect = c.x / c.y, l.updateProjectionMatrix(), v.setSize(c.x, c.y)), u.scale.x = l.aspect;
            var r = new THREE.Vector2($("#viz").width(), $("#viz").height());
            r.x -= 20, r.y -= 20;
            var n = r.x / r.y,
                i = new THREE.Vector2,
                a = new THREE.Vector2;
            n < o ? (i.x = Math.min(r.x, c.x), i.y = i.x / o) : (i.y = Math.min(r.y, c.y), i.x = i.y * o), a.x = i.x / c.x, a.y = i.y / c.y;
            var s = new THREE.Vector2(Math.floor((r.x - i.x) / 2), Math.floor((r.y - i.y) / 2));
            s.x += 10, s.y += 10, TweenMax.set("#webgl", {
                scaleX: a.x,
                scaleY: a.y,
                x: s.x,
                y: s.y
            }), TweenMax.set("#progress-bar", {
                scaleY: 1 / a.y
            }), TweenMax.set("#progress-bar-bkgnd", {
                scaleY: 1 / a.y
            }), MOSH.events.emit("resize")
        }
    }

    function m(e) {
        switch (e.keyCode) {
            case 32:
                MOSH.FX.randomizeFilters()
        }
    }
    return {
        init: function() {
            if (console.log("PHOTOMOSH", MOSH.VERSION), o = -1 < window.location.href.indexOf("?dev"), t = !!("ontouchstart" in window), r = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream, -1 < window.location.href.indexOf("mobile") && (t = !0), function() {
                    var e = !1;
                    try {
                        e = MediaRecorder.isTypeSupported("video/webm")
                    } catch (e) {}
                    e || ($("#opt-webm").css("display", "none"), $("#save-options").css("width", "140px"))
                }(), TweenMax.to($("#intro"), 1.5, {
                    opacity: 1
                }), ! function() {
                    try {
                        return !!window.WebGLRenderingContext && !!document.createElement("canvas").getContext("experimental-webgl")
                    } catch (e) {
                        return !1
                    }
                }()) return $("#input-options").css("display", "none"), $("#file-prompt").css("display", "none"), TweenMax.to($("#cam-prompt"), .6, {
                autoAlpha: 1
            }), void $("#cam-prompt").html("This browser or device does not support WebGL. Please try with latest Chrome.");
            $("#btn-mosh").on("click", MOSH.FX.randomizeFilters), document.onselectstart = function() {
                return !1
            }, (l = new THREE.PerspectiveCamera(75, 1.5, 1, 3e3)).position.z = 65, n = new THREE.Scene, i = new THREE.MeshBasicMaterial;
            var e = new THREE.PlaneBufferGeometry(100, 100, 1, 1);
            u = new THREE.Mesh(e, i), n.add(u), s = new Stats, o && document.body.append(s.domElement), s.domElement.id = "stats", v = new THREE.WebGLRenderer({
                preserveDrawingBuffer: !0
            }), $("#webgl").append(v.domElement), MOSH.FX.init(), MOSH.Recorder.init(), MOSH.Input.init(), window.addEventListener("resize", d, !1), $(document).on("keydown", m, !1), d(), a = $("#intro-logo")
        },
        update: function e() {
            requestAnimationFrame(e), a.css("opacity", Math.random() + .5), MOSH.Input.getSourceReady() && (MOSH.events.emit("update"), s.update())
        },
        trace: function(e) {
            $("#debug-text").text(e)
        },
        getCamera: function() {
            return l
        },
        getScene: function() {
            return n
        },
        getRenderer: function() {
            return v
        },
        getIsMobile: function() {
            return t
        },
        getIsIOS: function() {
            return r
        },
        renderSize: c,
        onResize: d,
        updateMaterial: function(e) {
            i.map = e, i.needsUpdate = !0, d()
        }
    }
}(), $(document).ready(function() {
    MOSH.Main.init()
}), MOSH.FX = function() {
    var t, r, n, i, a, s, l = [],
        v = ["lookup_miss_etikate.png", "lookup_amatorka.png", "lookup_soft_elegance_1.png", "lookup_soft_elegance_2.png"];

    function u(e) {
        var r;
        a = e.filters, $.each(a, function(e, o) {
            (r = i.addFolder(o.displayName)).add(o, "on").listen().onChange(f), o.on && r.open(), $.each(o.params, function(e, o) {
                if (o.automate) return !0;
                var t;
                "color" === o.type ? r.addColor(o, "value").listen().name(o.displayName).onChange(c) : (r.add(o, "value", o.min, o.max).step(o.step).listen().name(o.displayName).onChange(c), "high" === o.randRange ? (t = o.max - o.min, o.randMin = o.min + .75 * t, o.randMax = o.max) : "low" === o.randRange ? (t = o.max - o.min, o.randMin = o.min, o.randMax = o.min + .4 * t) : (o.randMin = o.min, o.randMax = o.max))
            }), o.folder = r
        }), f(), c(), MOSH.Main.update()
    }

    function c() {
        $.each(a, function(t, e) {
            $.each(e.params, function(e, o) {
                if (o.custom) return !0;
                "color" === o.type ? s[t].uniforms[e].value = new THREE.Color(o.value) : s[t].uniforms[e].value = o.value
            })
        }), s.lut.uniforms.lookupTable.value = l[Math.floor(a.lut.params.mode.value)]
    }

    function f() {
        (t = new THREE.EffectComposer(MOSH.Main.getRenderer())).addPass(r), $.each(a, function(e, o) {
            o.on && t.addPass(s[e])
        }), t.addPass(n), n.renderToScreen = !0, m()
    }

    function d() {
        var e = performance.now() / (1e3 * MOSH.Recorder.getVideoDuration());
        s.wobble.uniforms.time.value = e, s.slices.uniforms.time.value = e, s.rainbow.uniforms.time.value = e, s.badtv.uniforms.time.value = e, s.smear.uniforms.time.value = e, s.scanlines.uniforms.time.value = e, s.barrelBlur.uniforms.time.value = e, s.shake.uniforms.time.value = e, s.glitcher.uniforms.time.value = e, s.noiseDisplace.uniforms.time.value = e, s.rgb.uniforms.angle.value = 6.28 * (MOSH.noise.noise(e, 99, 0) + .5), s.huesat.uniforms.hue.value = 2 * MOSH.noise.noise(2 * e, 999, 0), t.render(.1)
    }

    function m() {
        t && t.setSize(MOSH.Main.renderSize.x, MOSH.Main.renderSize.y), s.scanlines.uniforms.height.value = MOSH.Main.renderSize.y, s.linocut.uniforms.resolution.value = MOSH.Main.renderSize
    }
    return {
        init: function() {
            var e = new THREE.TextureLoader;
            MOSH.events.on("update", d), MOSH.events.on("resize", m), r = new THREE.RenderPass(MOSH.Main.getScene(), MOSH.Main.getCamera()), n = new THREE.ShaderPass(THREE.CopyShader), (s = {}).badtv = new THREE.ShaderPass(THREE.BadTVShader), s.rgb = new THREE.ShaderPass(THREE.RGBShiftShader), s.pixelate = new THREE.ShaderPass(THREE.PixelateShader), s.slices = new THREE.ShaderPass(THREE.SlicesShader), s.dotmatrix = new THREE.ShaderPass(THREE.DotMatrixShader), s.scanlines = new THREE.ShaderPass(THREE.ScanlinesShader), s.shake = new THREE.ShaderPass(THREE.ShakeShader), s.vignette = new THREE.ShaderPass(THREE.VignetteShader), s.mirror = new THREE.ShaderPass(THREE.MirrorShader), s.dotscreen = new THREE.ShaderPass(THREE.DotScreenShader), s.lut = new THREE.ShaderPass(THREE.LUTShader), s.glow = new THREE.ShaderPass(THREE.GlowShader), s.posterize = new THREE.ShaderPass(THREE.PosterizeShader), s.huesat = new THREE.ShaderPass(THREE.HueSaturationShader), s.brightness = new THREE.ShaderPass(THREE.BrightnessContrastShader), s.polar = new THREE.ShaderPass(THREE.PolarPixelateShader), s.edges = new THREE.ShaderPass(THREE.EdgeShader), s.tilt = new THREE.ShaderPass(THREE.VerticalTiltShiftShader), s.wobble = new THREE.ShaderPass(THREE.WobbleShader), s.smear = new THREE.ShaderPass(THREE.SmearShader), s.barrelBlur = new THREE.ShaderPass(THREE.BarrelBlurShader), s.glitcher = new THREE.ShaderPass(THREE.GlitcherShader), s.noiseDisplace = new THREE.ShaderPass(THREE.NoiseDisplaceShader), s.duoTone = new THREE.ShaderPass(THREE.DuoToneShader), s.rainbow = new THREE.ShaderPass(THREE.RainbowShader), s.solarize = new THREE.ShaderPass(THREE.SolarizeShader), s.linocut = new THREE.ShaderPass(THREE.LinocutShader);
            for (var o = 0; o < v.length; o++) {
                var t = e.load("res/lut/" + v[o]);
                t.genMipmaps = !1, t.minFilter = THREE.LinearFilter, t.magFilter = THREE.LinearFilter, t.wrapS = THREE.ClampToEdgeWrapping, t.wrapT = THREE.ClampToEdgeWrapping, l.push(t)
            }
            s.lut.uniforms.lookupTable.value = l[0], i = new dat.GUI({
                autoPlace: !1
            }), $("#settings").append(i.domElement), $.ajax({
                type: "GET",
                dataType: "json",
                url: "./res/json/filters.json",
                success: u
            })
        },
        onResize: m,
        randomizeFilters: function() {
            $.each(a, function(e, o) {
                o.on = !1, o.folder.close()
            });
            for (var e = Object.keys(a), o = e.length, t = 0; t < 3; t++) {
                var r = ATUtil.randomInt(0, o - 1);
                a[e[r]].on = !0, a[e[r]].folder.open()
            }
            $.each(a, function(e, o) {
                $.each(o.params, function(e, o) {
                    "color" !== o.type && (o.value = ATUtil.randomRange(o.randMin, o.randMax))
                })
            }), f(), c()
        },
        getComposer: function() {
            return t
        }
    }
}(), MOSH.Input = function() {
    var r, n = !1,
        e = new THREE.Vector2,
        i = document.createElement("video");

    function o() {
        $("#file1").on("change", t, !1), MOSH.Main.getIsMobile() ? $("#file1").click() : ($("#input-options").css("display", "none"), $("#cam-prompt").css("display", "none"), TweenMax.to($("#file-prompt"), .6, {
            autoAlpha: 1
        }), $("#option-choose").on("click", function() {
            $("#file1").click()
        }), $("#sub-head").html("Select an image or short MP4 video."))
    }

    function t() {
        s(this.files[0])
    }

    function a(e) {
        e.preventDefault(), s(e.dataTransfer.files[0])
    }

    function s(e) {
        var o = e.type,
            t = new FileReader;
        if (o.match(/image\/\w+/)) t.onload = function() {
            ! function(e) {
                i.pause(), i.src = "", i.load();
                var o = new THREE.TextureLoader;
                r = o.load(e, l)
            }(t.result)
        };
        else {
            if (!o.match(/video\/\w+/)) return void console.alert("Only image and video files supported.");
            t.onload = function() {
                ! function(e) {
                    n = !1, i.onloadedmetadata = u, i.src = e, i.load()
                }(t.result)
            }
        }
        t.readAsDataURL(e)
    }

    function l() {
        r.minFilter = THREE.LinearFilter, e = new THREE.Vector2(r.image.width, r.image.height), MOSH.Recorder.setInputDuration(0), c()
    }

    function v() {
        u(), MOSH.Recorder.setInputDuration(0)
    }

    function u() {
        (r = new THREE.VideoTexture(i)).minFilter = THREE.LinearFilter, e = new THREE.Vector2(i.videoWidth, i.videoHeight), c(), console.log("webcam dims:", i.videoWidth, i.videoHeight), MOSH.Recorder.setInputDuration(i.duration), i.play()
    }

    function c() {
        $("#webgl").css("display", "block"), $("#intro").css("display", "none"), $("#save-options").css("display", "block"), $("#controls-holder").css("display", "block"), $("#bottom-controls-holder").css("display", "block"), $("#drop-target-holder").hide(), n = !0, MOSH.Main.updateMaterial(r)
    }

    function f() {
        $("#input-options").css("display", "none"), $("#file-prompt").css("display", "none"), TweenMax.to($("#cam-prompt"), .6, {
            autoAlpha: 1
        });
        navigator.mediaDevices.getUserMedia({
            audio: !1,
            video: {
                width: 1280,
                height: 720
            }
        }).then(function(e) {
            ! function(e) {
                i.onloadedmetadata = v, i.srcObject = e
            }(e)
        }).catch(function(e) {
            $("#cam-prompt").html("Unable to capture WebCam. Please reload the page or try using latest Chrome.")
        })
    }
    return {
        init: function() {
            $("#option-cam").on("click", f), $("#option-file").on("click", o), "undefined" != typeof FileReader && (window.addEventListener("dragover", function(e) {
                e.preventDefault(), e.stopPropagation()
            }, !1), window.addEventListener("dragenter", function(e) {
                $("#drop-target-holder").show(), e.preventDefault(), e.stopPropagation()
            }, !1), window.addEventListener("drop", a, !1)), i.loop = !0, i.autoplay = !0, i.muted = !0, $(i).attr("playsinline", ""), /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && (console.log("IS SAFARI"), document.body.appendChild(i), i.style.position = "absolute", i.style.height = "1px", i.style.width = "1px")
        },
        getSourceReady: function() {
            return n
        },
        getSourceSize: function() {
            return e
        }
    }
}(), MOSH.Recorder = function() {
    var t, r, e, o, n = "jpg",
        i = 4,
        a = Math.floor(50);

    function s() {
        n = "jpg", $("#opt-jpg").addClass("selected"), $("#opt-gif").removeClass("selected"), $("#opt-webm").removeClass("selected"), $("#btn-record").text("Save"), $("#btn-record").removeClass("vid-mode"), MOSH.Main.onResize()
    }

    function l() {
        n = "gif", $("#opt-jpg").removeClass("selected"), $("#opt-gif").addClass("selected"), $("#opt-webm").removeClass("selected"), $("#btn-record").text("Record"), $("#btn-record").addClass("vid-mode"), MOSH.Main.onResize()
    }

    function v() {
        n = "webm", $("#opt-jpg").removeClass("selected"), $("#opt-gif").removeClass("selected"), $("#opt-webm").addClass("selected"), $("#btn-record").text("Record"), $("#btn-record").addClass("vid-mode"), MOSH.Main.onResize()
    }

    function u() {
        "gif" === n ? (e = new GIF({
            workers: 8,
            quality: 20,
            workerScript: "js/gif.worker.js"
        }), o = setInterval(p, a), f()) : "webm" === n ? function() {
            var e = MOSH.Main.getRenderer().domElement.captureStream();
            r = [];
            var o = {
                mimeType: "video/webm;codecs=vp9",
                videoBitsPerSecond: 1e7
            };
            MediaRecorder.isTypeSupported(o.mimeType) || (console.log(o.mimeType + " is not Supported"), o = {
                mimeType: "video/webm;codecs=vp8"
            }, MediaRecorder.isTypeSupported(o.mimeType) || (console.log(o.mimeType + " is not Supported"), o = {
                mimeType: "video/webm"
            }, MediaRecorder.isTypeSupported(o.mimeType) || (console.log(o.mimeType + " is not Supported"), o = {
                mimeType: ""
            })));
            try {
                t = new MediaRecorder(e, o)
            } catch (e) {
                return console.error("Exception while creating MediaRecorder: " + e), alert("Unable to create MediaRecorder: " + e + ". mimeType: " + o.mimeType + "\n\n Try using latest Chrome.")
            }
            console.log("Created MediaRecorder with options", o), t.ondataavailable = x, t.start(100), f()
        }() : function() {
            MOSH.FX.getComposer().render(.1);
            var e = MOSH.Main.getRenderer().domElement.toDataURL("image/jpeg");
            MOSH.Main.getIsIOS() ? function(e, o) {
                var t = document.createElement("a");
                t.style.display = "none", t.href = e, t.target = "_blank", t.download = o, document.body.appendChild(t), t.click(), setTimeout(function() {
                    document.body.removeChild(t), window.URL.revokeObjectURL(e)
                }, 100)
            }(e, c() + ".jpg") : download(e, c() + ".jpg", "image/jpeg")
        }()
    }

    function c() {
        var e = new Date;
        return "MOSHED-" + e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate() + "-" + e.getHours() + "-" + e.getMinutes() + "-" + e.getSeconds()
    }

    function f() {
        $("#btn-record").off("click", u), $("#btn-record").css("cursor", "default"), $("#btn-record").toggleClass("recording"), $("#btn-record").text("Recording..."), $("#progress-bar").show(), $("#progress-bar-bkgnd").show(), TweenMax.fromTo($("#progress-bar"), i, {
            scaleX: 0
        }, {
            scaleX: 1,
            ease: Power0.easeNone
        }), TweenMax.fromTo($("#btn-record"), .4, {
            backgroundColor: "rgba(255,0,0,0.15)"
        }, {
            backgroundColor: "rgba(255,0,0,0.45)",
            yoyo: !0,
            repeat: -1
        }), setTimeout(d, 1e3 * i)
    }

    function d() {
        "gif" === n ? (clearInterval(o), e.render(), $("#btn-record").text("Processing..."), e.on("finished", function(e) {
            ! function(e) {
                download(e, c() + ".gif", "image/gif"), m()
            }(e)
        })) : "webm" === n && (t.stop(), function() {
            var e = new Blob(r, {
                type: "video/webm"
            });
            download(e, c() + ".webm", "video/webm")
        }(), m()), $("#progress-bar").hide(), $("#progress-bar-bkgnd").hide()
    }

    function m() {
        TweenMax.killTweensOf("#btn-record"), TweenMax.set("#btn-record", {
            backgroundColor: "rgba(255,255,255,0.15)"
        }), $("#btn-record").on("click", u), $("#btn-record").css("cursor", "pointer"), $("#btn-record").toggleClass("recording"), $("#btn-record").text("Record")
    }

    function p() {
        e.addFrame(MOSH.Main.getRenderer().domElement, {
            copy: !0,
            delay: a
        })
    }

    function x(e) {
        e.data && 0 < e.data.size && r.push(e.data)
    }
    return {
        init: function() {
            $("#opt-jpg").on("click", s), $("#opt-gif").on("click", l), $("#opt-webm").on("click", v), $("#btn-record").on("click", u)
        },
        setInputDuration: function(e) {
            i = Math.min(e, 4), 0 === e && (i = 4)
        },
        getRecordMode: function() {
            return n
        },
        getVideoDuration: function() {
            return i
        }
    }
}(), THREE.WobbleShader = {
    uniforms: {
        tDiffuse: {
            type: "t",
            value: null
        },
        time: {
            type: "f",
            value: 0
        },
        strength: {
            type: "f",
            value: .001
        },
        size: {
            type: "f",
            value: 50
        },
        speed: {
            type: "f",
            value: 1
        }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform sampler2D tDiffuse;", "uniform float time;", "uniform float strength;", "uniform float size;", "uniform float speed;", "varying vec2 vUv;", "const float TWO_PI = 6.283185307179586;", "void main() {", "vec2 p = -1.0 + 2.0 * vUv;", "float pos = time * TWO_PI + length(p * size);", "gl_FragColor = texture2D(tDiffuse, vUv + strength * vec2(cos(pos), sin(pos)));", "}"].join("\n")
};
