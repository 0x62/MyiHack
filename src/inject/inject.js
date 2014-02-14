chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		console.log("MyiMaths Hacker built by Benedict Lewis (http://www.ovalbit.com). Be a good student, don't cheat too much.");
		console.log("Your answers are being loaded, please wait up to 10 seconds for them to be filled.");

		/* Check for jQuery */
		if(!jQuery){
			alert("For some reason the jQuery files couldn't be loaded. The script probably won't work now.");
		}
		
		/* Add the credits message */
		$("body").append("<div class=\"hacked\">Click <a href=\"#\" id=\"hack\">here</a> to solve</div>");

		$("#hack").on("click", function(){
			$(".hacked").html("Plugin by <a href=\"http://www.ovalbit.com\" target=\"_blank\">Benedict Lewis</a> [<a href=\"http://www.ovalbit.com/myimaths-is-easy-or-why-you-shouldnt-validate-client-side/\" target=\"_blank\">?</a>]");
			
			/* Check that this is a task rather than an exercise */
			if(!(window.document.embeds[0].GetVariable("q1answers")) || !(window.document.embeds[0].GetVariable("q2answers"))){
				var text = "<p>Sorry, we couldn't find any answers. Check that this is an online homework (this plugin does not work for online lessons) or reload the page and try again.</p>";

				/* Append the answers div */
				$("body").append("<div class=\"answers\">" + text + "</div>");

				/* Return to stop the rest of the code running */
				return false;
			}

			console.log("Raw _q1: " + window.document.embeds[0].GetVariable("q1answers"));
			console.log("Raw _q2: " + window.document.embeds[0].GetVariable("q2answers"));

			/* Get unformatted answers and split to array */
			var _q1 = window.document.embeds[0].GetVariable("q1answers").split(",");
			var _q2 = window.document.embeds[0].GetVariable("q2answers").split(",");

			/* Define new array to hold cleaned answers */
			var q1 = [];
			var q2 = [];

			/* Remove null/0 answers from old arrays and add to new array */
			for (var i = 0; i < _q1.length; i++) {
				if (_q1[i] !== undefined && _q1[i] !== null && _q1[i] !== "" && _q1[i] !== "0") {
					q1.push(_q1[i]);
				}
			}
			for (var i = 0; i < _q2.length; i++) {
				if (_q2[i] !== undefined && _q2[i] !== null && _q2[i] !== "" && _q2[i] !== "0") {
					q2.push(_q2[i]);
				}
			}

			/* Prepare answers */
			var text = "<p>Awesome! We found your answers, please see them below:</p><strong>Q1</strong><ul>";
			for (var i = 0; i < q1.length; i++) {
				text += "<li>" + q1[i] + "</li>";
			}
			text += "</ul><strong>Q2</strong><ul>";
			for (var i = 0; i < q2.length; i++) {
				text += "<li>" + q2[i] + "</li>";
			}
			text += "</ul>Enter the answers in the order that they appear.";

			/* Check if either of the answers are blank */
			if(q1.length == 0 || q2.length == 0){
				text = "<p>It looks like at the answers came up blank for at least one of the questions. Sorry about that. This is a bug with MyiMaths where the answers to certain questions get stored wrong. This often happens with questions involving graphs, and there is nothing we can do. Looks like you're on your own this time! Try again with another task. If this keeps happening feel free to send me an <a href=\"mailto:benedict@ovalbit.com\">angry email</a></p>";
			}

			/* Append the answers div */
			$("body").append("<div class=\"answers\">" + text + "</div>");
		});
	}
	}, 10);
});