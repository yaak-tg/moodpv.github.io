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
}(), THREE.BadTVShader = {
    uniforms: {
        tDiffuse: {
            type: "t",
            value: null
        },
        time: {
            type: "f",
            value: 0
        },
        distortion: {
            type: "f",
            value: 3
        },
        distortion2: {
            type: "f",
            value: 5
        },
        speed: {
            type: "f",
            value: .116
        },
        rollSpeed: {
            type: "f",
            value: .05
        }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform sampler2D tDiffuse;", "uniform float time;", "uniform float distortion;", "uniform float distortion2;", "uniform float speed;", "uniform float rollSpeed;", "varying vec2 vUv;", "vec3 mod289(vec3 x) {", "  return x - floor(x * (1.0 / 289.0)) * 289.0;", "}", "vec2 mod289(vec2 x) {", "  return x - floor(x * (1.0 / 289.0)) * 289.0;", "}", "vec3 permute(vec3 x) {", "  return mod289(((x*34.0)+1.0)*x);", "}", "float snoise(vec2 v)", "  {", "  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0", "                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)", "                     -0.577350269189626,  // -1.0 + 2.0 * C.x", "                      0.024390243902439); // 1.0 / 41.0", "  vec2 i  = floor(v + dot(v, C.yy) );", "  vec2 x0 = v -   i + dot(i, C.xx);", "  vec2 i1;", "  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);", "  vec4 x12 = x0.xyxy + C.xxzz;", " x12.xy -= i1;", "  i = mod289(i); // Avoid truncation effects in permutation", "  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))", "\t\t+ i.x + vec3(0.0, i1.x, 1.0 ));", "  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);", "  m = m*m ;", "  m = m*m ;", "  vec3 x = 2.0 * fract(p * C.www) - 1.0;", "  vec3 h = abs(x) - 0.5;", "  vec3 ox = floor(x + 0.5);", "  vec3 a0 = x - ox;", "  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );", "  vec3 g;", "  g.x  = a0.x  * x0.x  + h.x  * x0.y;", "  g.yz = a0.yz * x12.xz + h.yz * x12.yw;", "  return 130.0 * dot(m, g);", "}", "void main() {", "vec2 p = vUv;", "float ty = time * speed * 17.346;", "float yt = p.y - ty;", "float offset = snoise(vec2(yt*3.0,0.0))*0.2;", "offset = offset*distortion * offset*distortion * offset;", "offset += snoise(vec2(yt*50.0,0.0))*distortion2*0.002;", "gl_FragColor = texture2D(tDiffuse,  vec2(fract(p.x + offset),fract(p.y - time * rollSpeed) ));", "}"].join("\n")
}, THREE.BarrelBlurShader = {
    uniforms: {
        tDiffuse: {
            type: "t",
            value: null
        },
        amount: {
            type: "f",
            value: .5
        },
        time: {
            type: "f",
            value: 0
        }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform sampler2D tDiffuse;", "uniform float amount;", "uniform float time;", "varying vec2 vUv;", "const int num_iter = 16;", "const float reci_num_iter_f = 1.0 / float(num_iter);", "const float gamma = 2.2;", "const float MAX_DIST_PX = 200.0;", "vec2 barrelDistortion( vec2 p, vec2 amt )", "{", "    p = 2.0*p-1.0;", "    //float BarrelPower = 1.125;", "    const float maxBarrelPower = 3.0;", "    float theta  = atan(p.y, p.x);", "    float radius = length(p);", "    radius = pow(radius, 1.0 + maxBarrelPower * amt.x);", "    p.x = radius * cos(theta);", "    p.y = radius * sin(theta);", "    return 0.5 * ( p + 1.0 );", "}", "float sat( float t )", "{", "\treturn clamp( t, 0.0, 1.0 );", "}", "float linterp( float t ) {", "\treturn sat( 1.0 - abs( 2.0*t - 1.0 ) );", "}", "float remap( float t, float a, float b ) {", "\treturn sat( (t - a) / (b - a) );", "}", "vec3 spectrum_offset( float t ) {", "\tvec3 ret;", "\tfloat lo = step(t,0.5);", "\tfloat hi = 1.0-lo;", "\tfloat w = linterp( remap( t, 1.0/6.0, 5.0/6.0 ) );", "\tret = vec3(lo,1.0,hi) * vec3(1.0-w, w, 1.0-w);", "", "\treturn pow( ret, vec3(1.0/2.2) );", "}", "float nrand( vec2 n )", "{", "\treturn fract(sin(dot(n.xy, vec2(12.9898, 78.233)))* 43758.5453);", "}", "vec3 lin2srgb( vec3 c )", "{", "    return pow( c, vec3(gamma) );", "}", "vec3 srgb2lin( vec3 c )", "{", "    return pow( c, vec3(1.0/gamma));", "}", "void main() {", "vec2 uv = vUv;", "vec2 max_distort = vec2(amount);", "vec2 oversiz = barrelDistortion( vec2(1,1), max_distort );", "uv = 2.0 * uv - 1.0;", "uv = uv / (oversiz*oversiz);", "uv = 0.5 * uv + 0.5;", "vec3 sumcol = vec3(0.0);", "vec3 sumw = vec3(0.0);", "float rnd = nrand( uv + fract(time) );", "for ( int i=0; i<num_iter;++i ){", "float t = (float(i)+rnd) * reci_num_iter_f;", "vec3 w = spectrum_offset( t );", "sumw += w;", "sumcol += w * srgb2lin(texture2D( tDiffuse, barrelDistortion(uv, max_distort*t ) ).rgb);", "}", "sumcol.rgb /= sumw;", "vec3 outcol = lin2srgb(sumcol.rgb);", "outcol += rnd/255.0;", "gl_FragColor = vec4( outcol, 1.0);", "}"].join("\n")
}, THREE.DotMatrixShader = {
    uniforms: {
        tDiffuse: {
            type: "t",
            value: null
        },
        dots: {
            type: "f",
            value: 40
        },
        size: {
            type: "f",
            value: .3
        },
        blur: {
            type: "f",
            value: .3
        }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform sampler2D tDiffuse;", "uniform float dots;", "uniform float size;", "uniform float blur;", "varying vec2 vUv;", "void main() {", "float dotSize = 1.0/dots;", "vec2 samplePos = vUv - mod(vUv, dotSize) + 0.5 * dotSize;", "float distanceFromSamplePoint = distance(samplePos, vUv);", "vec4 col = texture2D(tDiffuse, samplePos);", "gl_FragColor = mix(col, vec4(0.0), smoothstep(dotSize * size, dotSize *(size + blur), distanceFromSamplePoint));", "}"].join("\n")
}, THREE.DuoToneShader = {
    uniforms: {
        tDiffuse: {
            value: null
        },
        colLight: {
            value: new THREE.Color(.953, .173, .36)
        },
        colDark: {
            value: new THREE.Color(.18, .184, .38)
        }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform sampler2D tDiffuse;", "uniform vec3 colLight;", "uniform vec3 colDark;", "varying vec2 vUv;", "float luma(vec3 color) {", "return dot(color, vec3(0.299, 0.587, 0.114));", "}", "vec3 boostContrast(vec3 col, float amount){", "return  (col - 0.5) / (1.0 - amount) + 0.5;", "}", "void main() {", "vec3 col =  texture2D(tDiffuse, vUv).rgb;", "col = clamp(col,0.0,1.0);", "col = mix(colDark,colLight, luma(col));", "gl_FragColor = vec4(col,1.0);", "}"].join("\n")
}, THREE.EdgeShader = {
    uniforms: {
        tDiffuse: {
            value: null
        },
        amount: {
            value: 0
        },
        passthru: {
            value: 0
        }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform sampler2D tDiffuse;", "uniform float amount;", "uniform float passthru;", "varying vec2 vUv;", "vec2 texel = vec2(1.0 /512.0);", "mat3 G[2];", "const mat3 g0 = mat3( 1.0, 2.0, 1.0, 0.0, 0.0, 0.0, -1.0, -2.0, -1.0 );", "const mat3 g1 = mat3( 1.0, 0.0, -1.0, 2.0, 0.0, -2.0, 1.0, 0.0, -1.0 );", "void main(void)", "{", "mat3 I;", "float cnv[2];", "vec3 sample;", "G[0] = g0;", "G[1] = g1;", "for (float i=0.0; i<3.0; i++)", "for (float j=0.0; j<3.0; j++) {", "sample = texture2D( tDiffuse, vUv + texel * vec2(i-1.0,j-1.0) ).rgb;", "I[int(i)][int(j)] = length(sample);", "}", "for (int i=0; i<2; i++) {", "float dp3 = dot(G[i][0], I[0]) + dot(G[i][1], I[1]) + dot(G[i][2], I[2]);", "cnv[i] = dp3 * dp3; ", "}", "vec4 orig = texture2D( tDiffuse, vUv);", "gl_FragColor = orig * passthru + vec4(0.5 * sqrt(cnv[0]*cnv[0]+cnv[1]*cnv[1])) * amount;", "} "].join("\n")
}, THREE.GlitcherShader = {
    uniforms: {
        tDiffuse: {
            type: "t",
            value: null
        },
        amount: {
            type: "f",
            value: .5
        },
        speed: {
            type: "f",
            value: .5
        },
        time: {
            type: "f",
            value: 0
        }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform sampler2D tDiffuse;", "varying vec2 vUv;", "uniform float amount;", "uniform float speed;", "uniform float time;", "float random1d(float n){", "return fract(sin(n) * 43758.5453);", "}", "float random2d(vec2 n) { ", "return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);", "}", "float randomRange (in vec2 seed, in float min, in float max) {", "return min + random2d(seed) * (max - min);", "}", "float insideRange(float v, float bottom, float top) {", "return step(bottom, v) - step(top, v);", "}", "float rand(vec2 co){", "return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);", "}", "void main() {", "vec2 uv = vUv;", "float sTime = floor(time * speed * 6.0 * 24.0);", "vec3 inCol = texture2D(tDiffuse, uv).rgb;", "vec3 outCol = inCol;", "float maxOffset = amount/2.0;", "vec2 uvOff;", "for (float i = 0.0; i < 10.0; i += 1.0) {", "if (i > 10.0 * amount) break;", "float sliceY = random2d(vec2(sTime + amount, 2345.0 + float(i)));", "float sliceH = random2d(vec2(sTime + amount, 9035.0 + float(i))) * 0.25;", "float hOffset = randomRange(vec2(sTime + amount, 9625.0 + float(i)), -maxOffset, maxOffset);", "uvOff = uv;", "uvOff.x += hOffset;", "vec2 uvOff = fract(uvOff);", "if (insideRange(uv.y, sliceY, fract(sliceY+sliceH)) == 1.0 ){", "outCol = texture2D(tDiffuse, uvOff).rgb;", "}", "}", "float maxColOffset = amount/6.0;", "vec2 colOffset = vec2(randomRange(vec2(sTime + amount, 3545.0),-maxColOffset,maxColOffset), randomRange(vec2(sTime , 7205.0),-maxColOffset,maxColOffset));", "uvOff = fract(uv + colOffset);", "float rnd = random2d(vec2(sTime + amount, 9545.0));", "if (rnd < 0.33){", "outCol.r = texture2D(tDiffuse, uvOff).r;", "}else if (rnd < 0.66){", "outCol.g = texture2D(tDiffuse, uvOff).g;", "} else{", "outCol.b = texture2D(tDiffuse, uvOff).b;", "}", "gl_FragColor = vec4(outCol,1.0);", "}"].join("\n")
}, THREE.GlowShader = {
    uniforms: {
        tDiffuse: {
            type: "t",
            value: null
        },
        amount: {
            type: "f",
            value: .5
        },
        size: {
            type: "f",
            value: 4
        },
        darkness: {
            type: "f",
            value: .1
        },
        resolution: {
            type: "v2",
            value: new THREE.Vector2(800, 600)
        }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform sampler2D tDiffuse;", "uniform float size;", "uniform float amount;", "uniform vec2 resolution;", "uniform float darkness;", "varying vec2 vUv;", "void main() {", "float h = size / resolution.x;", "float v = size / resolution.y;", "vec4 sum = vec4( 0.0 );", "sum += (texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) )- darkness) * 0.051 ;", "sum += (texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) )- darkness) * 0.0918;", "sum += (texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) )- darkness) * 0.12245;", "sum += (texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) )- darkness) * 0.1531;", "sum += (texture2D( tDiffuse, vec2( vUv.x, vUv.y ) )- darkness) * 0.1633;", "sum += (texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) )- darkness) * 0.1531;", "sum += (texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) )- darkness) * 0.12245;", "sum += (texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) )- darkness) * 0.0918;", "sum += (texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) )- darkness) * 0.051;", "sum += (texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) )- darkness) * 0.051;", "sum += (texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) )- darkness) * 0.0918;", "sum += (texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) )- darkness) * 0.12245;", "sum += (texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) )- darkness) * 0.1531;", "sum += (texture2D( tDiffuse, vec2( vUv.x, vUv.y ) )- darkness) * 0.1633;", "sum += (texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) )- darkness) * 0.1531;", "sum += (texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) )- darkness) * 0.12245;", "sum += (texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) )- darkness) * 0.0918;", "sum += (texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) )- darkness) * 0.051;", "vec4 base = texture2D( tDiffuse, vUv );", "gl_FragColor = base + max(sum,0.0) * amount;", "}"].join("\n")
}, THREE.LUTShader = {
    uniforms: {
        tDiffuse: {
            type: "t",
            value: null
        },
        lookupTable: {
            type: "t",
            value: null
        },
        strength: {
            type: "f",
            value: 1
        }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform sampler2D tDiffuse;", "uniform sampler2D lookupTable;", "uniform float strength;", "varying vec2 vUv;", "void main() {", "vec4 col = texture2D( tDiffuse, vUv );", "float blueColor = col.b * 63.0;", "vec2 quad1;", "quad1.y = floor(floor(blueColor) / 8.0);", "quad1.x = floor(blueColor) - (quad1.y * 8.0);", "vec2 quad2;", "quad2.y = floor(ceil(blueColor) / 8.0);", "quad2.x = ceil(blueColor) - (quad2.y * 8.0);", "vec2 texPos1;", "texPos1.x = (quad1.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * col.r);", "texPos1.y = (quad1.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * col.g);", "texPos1.y = 1.0-texPos1.y;", "vec2 texPos2;", "texPos2.x = (quad2.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * col.r);", "texPos2.y = (quad2.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * col.g);", "texPos2.y = 1.0-texPos2.y;", "vec4 newColor1 = texture2D(lookupTable, texPos1);", "vec4 newColor2 = texture2D(lookupTable, texPos2);", "vec4 newColor = mix(newColor1, newColor2, fract(blueColor));", "gl_FragColor = mix(col, vec4(newColor.rgb, col.w), strength);", "}"].join("\n")
}, THREE.LinocutShader = {
    uniforms: {
        tDiffuse: {
            type: "t",
            value: null
        },
        resolution: {
            type: "v2"
        },
        scale: {
            type: "f",
            value: 0
        }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform sampler2D tDiffuse;", "uniform vec2 resolution;", "varying vec2 vUv;", "uniform float scale;", "float luma(vec3 color) {", "return dot(color, vec3(0.299, 0.587, 0.114));", "}", "void main() {", "vec2 center = vec2( 0.5 );", "vec2 uv = vUv;", "float noiseScale = 1.;", "float radius = 0.5;", "vec2 d = uv - center;", "float r = length( d * vec2( 1., resolution.y / resolution.x ) ) * scale;", "float a = atan(d.y,d.x) + noiseScale*(radius-r)/radius;", "vec2 uvt = center+r*vec2(cos(a),sin(a));", "vec2 uv2 = vUv;", "float c = ( .75 + .25 * sin( uvt.x * 1000. ) );", "vec4 color = texture2D( tDiffuse, uv2 );", "float l = luma( color.rgb );", "float f = smoothstep( .5 * c, c, l );", "f = smoothstep( 0., .5, f );", "vec3 col = vec3(f);", "gl_FragColor = vec4( col,.0);", "}"].join("\n")
}, THREE.NoiseDisplaceShader = {
    uniforms: {
        tDiffuse: {
            type: "t",
            value: null
        },
        time: {
            type: "f",
            value: 1
        },
        speed: {
            type: "f",
            value: .5
        },
        scale: {
            type: "f",
            value: .5
        },
        amount: {
            type: "f",
            value: .5
        }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform sampler2D tDiffuse;", "uniform float time;", "uniform float scale;", "uniform float amount;", "uniform float speed;", "varying vec2 vUv;", "vec3 mod289(vec3 x) {", "  return x - floor(x * (1.0 / 289.0)) * 289.0;", "}", "vec2 mod289(vec2 x) {", "  return x - floor(x * (1.0 / 289.0)) * 289.0;", "}", "vec3 permute(vec3 x) {", "  return mod289(((x*34.0)+1.0)*x);", "}", "float snoise(vec2 v)", "  {", "  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0", "                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)", "                     -0.577350269189626,  // -1.0 + 2.0 * C.x", "                      0.024390243902439); // 1.0 / 41.0", "  vec2 i  = floor(v + dot(v, C.yy) );", "  vec2 x0 = v -   i + dot(i, C.xx);", "  vec2 i1;", "  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);", "  vec4 x12 = x0.xyxy + C.xxzz;", " x12.xy -= i1;", "  i = mod289(i); // Avoid truncation effects in permutation", "  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))", "\t\t+ i.x + vec3(0.0, i1.x, 1.0 ));", "  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);", "  m = m*m ;", "  m = m*m ;", "  vec3 x = 2.0 * fract(p * C.www) - 1.0;", "  vec3 h = abs(x) - 0.5;", "  vec3 ox = floor(x + 0.5);", "  vec3 a0 = x - ox;", "  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );", "  vec3 g;", "  g.x  = a0.x  * x0.x  + h.x  * x0.y;", "  g.yz = a0.yz * x12.xz + h.yz * x12.yw;", "  return 130.0 * dot(m, g);", "}", "float getNoise(vec2 uv, float t){", "uv -= 0.5;", "float scl = 4.0 * scale;", "float noise = snoise( vec2(uv.x * scl ,uv.y * scl - t * speed ));", "scl = 16.0 * scale;", "noise += snoise( vec2(uv.x * scl + t* speed ,uv.y * scl )) * 0.2 ;", "scl = 26.0 * scale;", "noise += snoise( vec2(uv.x * scl + t* speed ,uv.y * scl )) * 0.2 ;", "return noise;", "}", "void main() {", "vec2 uv = vUv;", "float noise = getNoise(uv, time * 24.0);", "vec2 noiseUv = uv + amount * noise;", "noiseUv = fract(noiseUv);", "gl_FragColor = texture2D(tDiffuse,noiseUv);", "}"].join("\n")
}, THREE.PixelateShader = {
    uniforms: {
        tDiffuse: {
            type: "t",
            value: null
        },
        pixelsX: {
            type: "f",
            value: 10
        },
        pixelsY: {
            type: "f",
            value: 10
        }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform sampler2D tDiffuse;", "uniform float pixelsX;", "uniform float pixelsY;", "varying vec2 vUv;", "void main() {", "vec2 p = vUv;", "p.x = floor(p.x * pixelsX)/pixelsX + 0.5/pixelsX;", "p.y = floor(p.y * pixelsY)/pixelsY + 0.5/pixelsY;", "gl_FragColor = texture2D(tDiffuse, p);", "}"].join("\n")
}, THREE.PolarPixelateShader = {
    uniforms: {
        tDiffuse: {
            type: "t",
            value: null
        },
        pixelsX: {
            type: "f",
            value: .05
        },
        pixelsY: {
            type: "f",
            value: .05
        }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform sampler2D tDiffuse;", "uniform float pixelsX;", "uniform float pixelsY;", "varying vec2 vUv;", "void main() {", "vec2 normCoord = 2.0 * vUv - 1.0;", "float r = length(normCoord);", "float phi = atan(normCoord.y, normCoord.x);", "r = r - mod(r, pixelsX) + 0.03;", "phi = phi - mod(phi, pixelsY);", "normCoord.x = r * cos(phi);", "normCoord.y = r * sin(phi);", "vec2 textureCoordinateToUse = normCoord / 2.0 + 0.5;", "gl_FragColor = texture2D(tDiffuse, textureCoordinateToUse );", "}"].join("\n")
}, THREE.PosterizeShader = {
    uniforms: {
        tDiffuse: {
            type: "t",
            value: null
        },
        levels: {
            type: "f",
            value: 4
        }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform sampler2D tDiffuse;", "uniform float levels;", "varying vec2 vUv;", "void main() {", "vec4 col = texture2D( tDiffuse, vUv );", "gl_FragColor.rgb = floor((col.rgb * levels) + vec3(0.5)) / levels;", "}"].join("\n")
}, THREE.RainbowShader = {
    uniforms: {
        tDiffuse: {
            type: "t",
            value: null
        },
        amount: {
            type: "f",
            value: .5
        },
        offset: {
            type: "f",
            value: .5
        },
        time: {
            type: "f",
            value: .5
        }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform sampler2D tDiffuse;", "uniform float amount;", "uniform float offset;", "uniform float time;", "varying vec2 vUv;", "vec3 rainbow2( in float t ){", "vec3 d = vec3(0.0,0.33,0.67);", "return 0.5 + 0.5*cos( 6.28318*(t+d) );", "}", "void main() {", "vec2 p = vUv;", "vec3 origCol = texture2D( tDiffuse, p ).rgb;", "vec2 off = texture2D( tDiffuse, p ).rg - 0.5;", "p += off * offset;", "vec3 rb = rainbow2( (p.x + p.y + time * 2.0) * 0.5);", "vec3 col = mix(origCol,rb,amount);", "gl_FragColor = vec4(col, 1.0);", "}"].join("\n")
}, THREE.ScanlinesShader = {
    uniforms: {
        tDiffuse: {
            value: null
        },
        time: {
            value: 0
        },
        noiseAmount: {
            value: .5
        },
        linesAmount: {
            value: .05
        },
        count: {
            value: 4096
        },
        height: {
            value: 4096
        }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform sampler2D tDiffuse;", "uniform float time;", "uniform float count;", "uniform float noiseAmount;", "uniform float linesAmount;", "uniform float height;", "varying vec2 vUv;", "#define PI 3.14159265359", "highp float rand( const in vec2 uv ) {", "const highp float a = 12.9898, b = 78.233, c = 43758.5453;", "highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );", "return fract(sin(sn) * c);", "}", "void main() {", "vec4 cTextureScreen = texture2D( tDiffuse, vUv );", "float dx = rand( vUv + time );", "vec3 cResult = cTextureScreen.rgb * dx * noiseAmount;", "float lineAmount = height * 1.8 * count;", "vec2 sc = vec2( sin( vUv.y * lineAmount), cos( vUv.y * lineAmount) );", "cResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * linesAmount;", "cResult = cTextureScreen.rgb + ( cResult );", "gl_FragColor =  vec4( cResult, cTextureScreen.a );", "}"].join("\n")
}, THREE.ShakeShader = {
    uniforms: {
        tDiffuse: {
            type: "t",
            value: null
        },
        time: {
            type: "f",
            value: 0
        },
        amount: {
            type: "f",
            value: .05
        }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform sampler2D tDiffuse;", "uniform float time;", "uniform float amount;", "varying vec2 vUv;", "float random1d(float n){", "return fract(sin(n) * 43758.5453);", "}", "void main() {", "vec2 p = vUv;", "vec2 offset = (vec2(random1d(time),random1d(time + 999.99)) - 0.5) * amount;", "p += offset;", "gl_FragColor = texture2D(tDiffuse, p);", "}"].join("\n")
}, THREE.SlicesShader = {
    uniforms: {
        tDiffuse: {
            type: "t",
            value: null
        },
        slices: {
            type: "f",
            value: 10
        },
        offset: {
            type: "f",
            value: .3
        },
        speedH: {
            type: "f",
            value: .5
        },
        speedV: {
            type: "f",
            value: 1
        },
        time: {
            type: "f",
            value: 0
        }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform sampler2D tDiffuse;", "uniform float slices;", "uniform float offset;", "uniform float time;", "uniform float speedV;", "uniform float speedH;", "varying vec2 vUv;", "float steppedVal(float v, float steps){", "return floor(v*steps)/steps;", "}", "float random1d(float n){", "return fract(sin(n) * 43758.5453);", "}", "float noise1d(float p){", "float fl = floor(p);", "float fc = fract(p);", "return mix(random1d(fl), random1d(fl + 1.0), fc);", "}", "const float TWO_PI = 6.283185307179586;", "void main() {", "vec2 uv = vUv;", "float n = noise1d(uv.y * slices + time * speedV * 3.0);", "float ns = steppedVal(fract(n  ),slices) + 2.0;", "float nsr = random1d(ns);", "vec2 uvn = uv;", "uvn.x += nsr * sin(time * TWO_PI + nsr * 20.0) * offset;", "gl_FragColor = texture2D(tDiffuse, uvn);", "}"].join("\n")
}, THREE.SmearShader = {
    uniforms: {
        tDiffuse: {
            type: "t",
            value: null
        },
        amount: {
            type: "f",
            value: .5
        },
        time: {
            type: "f",
            value: .5
        }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["const float TWO_PI = 6.283185307179586;", "uniform sampler2D tDiffuse;", "uniform float amount;", "uniform float time;", "varying vec2 vUv;", "vec2 rotate2D(vec2 position, float theta){", "mat2 m = mat2( cos(theta), -sin(theta), sin(theta), cos(theta) );", "return m * position;", "}", "void main() {", "vec2 p = vUv;", "vec2 sPos = vUv;", "vec2 off = texture2D( tDiffuse, sPos ).rg - 0.5;", "float ang = time * TWO_PI;", "off = rotate2D(off,ang);", "p += off * amount;", "vec4 col = texture2D(tDiffuse,p);", "gl_FragColor = col;", "}"].join("\n")
}, THREE.SolarizeShader = {
    uniforms: {
        tDiffuse: {
            type: "t",
            value: null
        },
        centerBrightness: {
            type: "f",
            value: .5
        },
        powerCurve: {
            type: "f",
            value: 2
        },
        colorize: {
            type: "f",
            value: .1
        }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform sampler2D tDiffuse;", "uniform float centerBrightness;", "uniform float powerCurve;", "uniform float colorize;", "varying vec2 vUv;", "vec3 rgb2hsv(vec3 c)\t{", "vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);", "vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);", "vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);", "float d = q.x - min(q.w, q.y);", "float e = 1.0e-10;", "return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);", "}", "vec3 hsv2rgb(vec3 c)\t{", "vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);", "vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);", "return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);", "}", "void main() {", "vec3 origCol = texture2D( tDiffuse, vUv ).rgb;", "vec3 hslColor = rgb2hsv(origCol);", "vec3 outColor = hslColor;", "outColor.b = pow(outColor.b, powerCurve);", "outColor.b = (outColor.b < centerBrightness) ? (1.0 - outColor.b / centerBrightness) : (outColor.b - centerBrightness) / centerBrightness;", "outColor.g = outColor.g * hslColor.b * colorize;", "outColor = hsv2rgb(outColor);", "gl_FragColor = vec4(outColor, 1.0);", "}"].join("\n")
}, THREE.WobbleShader = {
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
