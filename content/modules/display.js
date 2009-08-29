/**
 * @fileOverview
 * @name display.js
 * @author mooz <stillpedant@gmail.com>
 * @license The MIT License
 */

KeySnail.Display = {
    // ==== common ====
    modules: null,

    // ==== status bar ====
    statusBar: null,            // reference to the status bar
    msgTimeOut: null,           // timeout object to the status bar
    modeLine: null,

    init: function () {
        // this.modules = aModules;
        this.statusBar = document.getElementById('statusbar-display');
        // this.modeLine = document.getElementById('keysnail-minibuffer-modeline');
    },

    // ==================== Display ====================

    echoStatusBar: function (msg, time) {
        if (!this.statusBar) return;

        if (this.msgTimeOut) {
            // Cancell, when the timeout is already set to
            clearTimeout(this.msgTimeOut);
            this.msgTimeOut = null;
        }

        var self = this;

        self.statusBar.label = msg;
        if (time) {
            // Revert to default state (make closure and self to static)
            this.msgTimeOut = setTimeout(function () { self.echoStatusBar('', 0); }, time);
        }
    },

    prettyPrint: function (msg) {
        var dBody = content.document.body;

        if (this.modules.util.isFrameSetWindow(content))
            dBody = null;

        if (dBody) {
            var ksMessageId = "_ks_message";
            var ksMessageStyle = "z-index: 500; font-size: 14px; font-family: 'Helvetica';"
                + " padding: 3px; margin: 3px; color: white; background-color: #1e354a;"
                + " -moz-opacity: 0.9; opacity: 0.9; position: fixed;"
                + " bottom: 0.5em; left: 0.5em;";

            var lines = msg.split('\n');

            var container = content.document.getElementById(ksMessageId);

            if (!container) {
                container = document.createElement("div");
                container.id = ksMessageId;
                container.style.cssText = ksMessageStyle;

                dBody.appendChild(container);

                container.onclick = function () {
                    this.style.display = 'none';
                };
            }

            // clear
            while (container.hasChildNodes()) {
                container.removeChild(container.firstChild);
            }

            for (var i = 0; i < lines.length; ++i) {
                var p = document.createElement('p');
                p.appendChild(document.createTextNode(lines[i]));
                container.appendChild(p);
            }

            container.style.display = 'block';
        } else {
            this.echoStatusBar(msg);
        }
    },

    echoMiniBuffer: function (aLine) {
        this.modeLine.value = aLine;
    },

    message: function (msg) {
        Application.console.log(msg);
    }
};