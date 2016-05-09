// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application was suspended and then terminated.
                // To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
            }
            args.setPromise(WinJS.UI.processAll());

            // Retrieve the button and register our event handler. 
            var helloButton = document.getElementById("enableButton");
            helloButton.addEventListener("click", enableClickHandler, false);

            var helloButton = document.getElementById("disableButton");
            helloButton.addEventListener("click", disableClickHandler, false);

            try {
                WindowsBrokeredComponent.Clock.ontick = function (tickInfo) {
                    document.getElementById("dateText").innerText = tickInfo.date;
                    document.getElementById("timeText").innerText = tickInfo.time;
                };
            } catch (error) {
                document.getElementById("dateText").innerText = error;
            }
        }
    };

    app.oncheckpoint = function (args) {
    };

    function enableClickHandler(eventInfo) {
        try {
            WindowsBrokeredComponent.Clock.enable();
        } catch (error) {
            document.getElementById("dateText").innerText = error;
        }
    }

    function disableClickHandler(eventInfo) {
        try {
            WindowsBrokeredComponent.Clock.disable();
        } catch (error) {
            document.getElementById("dateText").innerText = error;
        }
    }

    app.start();
})();
