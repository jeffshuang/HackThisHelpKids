function detectImage(inputUrl) {
	var subscriptionKey = "0001beb2e84743f88ebb524de2421c20";
	var uriBase = "https://eastus.api.cognitive.microsoft.com/face/v1.0"

	var params = {
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes":
                "age,emotion",
        };

    $.ajax({
        url: uriBase + "?" + $.param(params),

        // Request headers.
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",

        // Request body.
        data: '{"url": ' + '"' + inputUrl + '"}',
    })

    .done(function(data) {
            // Show formatted JSON on webpage.
            $("#responseTextArea").val(JSON.stringify(data, null, 2));
    })
}