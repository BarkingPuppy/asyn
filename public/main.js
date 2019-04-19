$(() => {
    $("#list button").click(event => {
        $("#list-result").html("")
        $.ajax({
            url: "./list",
            success: data => {
                console.log("# of students: " + Object.keys(data).length)
                if (Object.keys(data).length === 0){
                    $("#list-result").html(`[No student data]`)
                } else {
                    $.each(data, (id, name) => {
                        $("#list-result").append(`"${id}":"${name}"<br>`)
                    })
                }
            }
        })
    })
    $("#search button").click(event => {
        $("#search-result").html("")
        let input = $("#search input[name='id']").val()
        if (input.length === 0){
            $("#search-result").html(`<h3>The student ID field cannot be left empty!</h3>`)
        } else {
            $.ajax({
                url: "./search",
                data: {id: input},
                success: data => {
                    console.log("search success")
                    $("#search-result").html(`<h3>${data}</h3>`)
                }
            })
        }        
    })
    $("#add button").click(event => {
        $("#add-result").html("")
        let input_id = $("#add input[name='id']").val()
        let input_name = $("#add input[name='name']").val()
        if (input_id.length === 0 || input_name.length === 0){
            $("#add-result").html(`<h3>The ID & name field cannot be left empty!</h3>`)
        } else {
            $.ajax({
                url: "./add",
                data: {
                    id: input_id,
                    name: input_name
                },
                success: data => {
                    console.log("add success")
                    $("#add-result").html(`<h3>${data}</h3>`)
                }
            })
        }        
    })
    $("#delete button").click(event => {
        $("#delete-result").html("")
        let input = $("#delete input[name='id']").val()
        if (input.length === 0){
            $("#delete-result").html(`<h3>The student ID field cannot be left empty!</h3>`)
        } else {
            $.ajax({
                url: "./delete",
                data: {id: input},
                success: data => {
                    console.log("delete success")
                    $("#delete-result").html(`<h3>${data}</h3>`)
                }
            })
        }        
    })
    $("#reset button").click(event => {
        $.ajax({
            url: "./reset",
            success: data => {
                console.log("reset success")
                alert(data)
            }
        })
    })
})

function htmlEncode(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\//g, '&#x2F;')
}