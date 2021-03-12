/* gets user input and creates new project with the input name */
$(document).ready(function(){
    // Get value on button click and show alert
    $("#createProj").click(function(){
        var str = $("#inputProjName").val();
        console.log(str);

        const data = {str};
        const options = {
        	method: 'POST',
        	headers: {
        		'Content-Type': 'application/json'
        	},
        	body: JSON.stringify(data)
        };
        fetch('/api', options)
    });
});