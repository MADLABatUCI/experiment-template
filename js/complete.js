/*
complete.js

    Author      :   Helio Tejeda
    University  :   University of California, Irvine
    Lab         :   Modeling and Decision-Making Lab (MADLAB)

Complete Page JS file (metadata and functionality).

This file should contain all variables and functions needed for
the end of the experiment.
*/

/******************************************************************************
    IMPORTS

        Import all FirebaseJS functionality.
******************************************************************************/
/// Importing functions and variables from the Firebase Psych library
import {
    writeRealtimeDatabase,
    firebaseUserId
} from "./firebasepsych1.0.js";


/******************************************************************************
    DEBUG

        For now we are in DEBUG mode. Turn off DEBUG mode in js/metadata.js.
******************************************************************************/
//      Turn ON/OFF Debug Mode
var DEBUG_COMPLETE     = DEBUG;


/******************************************************************************
    VARIABLES

        All metadata variables that are relevant to the survey page.
******************************************************************************/
// Database Path
var COMPLETE_DB_PATH        = EXPERIMENT_DATABASE_NAME + '/participantData/' + firebaseUserId + '/userFeedback';


/******************************************************************************
    RUN ON PAGE LOAD

        Run the following functions as soon as the page is loaded. This will
        render the consent.html page appropriately.
******************************************************************************/
$(document).ready(function (){
    /******************************************************************************
        FUNCTIONALITY

            All functions that will be used for the complete page.
    ******************************************************************************/
    function replaceClass(element, remove, add) {
        /*
            Use jQuery to replace the class of the given element.
        */

        $(element).removeClass(remove);
        $(element).addClass(add);
    };
    
    function copyCode() {
        /*
            Copy the Unique Code to the clipboard.

            Use this function if you will be providing a unique code for
            participants to submit when redirected to Prolific or MTurk.
        */
        var temp = $("<input>");
        $("body").append(temp);
        temp.val($('#code').val()).select();
        document.execCommand("copy");
        alert("Copied the code: " + temp.val());
        temp.remove();
    };

    function redirectToProlific() {
        /*
            Redirect participants back to prolific after the study.
        */
        //  Redirect URL for Experiment 02 (explanationstyleN with eplanations file v15) (pilot 10 participants)
        var restart;
        if (confirm("If you click 'OK', you will be redirected to the start of the experiment. If you click 'Cancel' you will stay on this page.")) {
            restart = true;
        } else {
            restart = false;
        }
        
        // The redirect URL should be back to Prolific
        if (restart) {
            if (DEBUG_COMPLETE){
                window.location.replace("https://madlabatuci.github.io/experiment-template/");
            } else {
                // This redirect should be updated to Prolific when you are LIVE
                window.location.replace("https://madlabatuci.github.io/experiment-template/");
            }
        }
    }

    function feedbackToSubmit() {
        /*
            Determine if there is feedback to submit or not.

            If there is then the button is enabled.
            If there isn't then the button is disabled.

        */
        let content = $("#user-feedback-text").val().trim();
        $('#user-feedback-button').prop('disabled', content === '');
    }

    function submitFeedback() {
        /*
            Submit user feedback.
        */
        writeRealtimeDatabase(
            COMPLETE_DB_PATH,
            {
                "feedbackTime": Date().toString(),
                "feedbackText": $('#user-feedback-text').val()
            }
        );

        replaceClass('#user-feedback-button', "btn-secondary", "btn-primary");
    };
    //  Copy Unique Code to Clipboard
    $('#unique-code-copy-button').click(redirectToProlific);

    //  Determine if there is User Feedback to be Submitted
    $('#user-feedback-text').on('keyup', feedbackToSubmit);

    //  Submit User Feedback
    $('#user-feedback-button').click(submitFeedback);
});