import '../stylesheets/style.less'

let selected_user_id = undefined
let path_components = location.pathname.split('/')
let last_path_component = path_components[path_components.length - 1]
if (last_path_component !== "")
{
    selected_user_id = Number(last_path_component)
}

let show_friends = location.search.search(/friends/g) > 0
let show_feed = location.search.search(/feed/g) > 0

function selectUser()
{
    let id = $(this).attr("id")
    if (id == selected_user_id)
    {
        return
    }
    $("#SelectedUserFrame").hide("drop", {direction: "right"}, 300)
    setTimeout(() =>
    {
        location.assign(`/${id}`)
    }, 300)
}

$(document).ready(() =>
{
    if (selected_user_id !== undefined)
    {
        $(`#${selected_user_id}`).children(".EnterButton").html("<i class=\"fa-solid fa-circle-user centred\"></i>").removeClass("clickable")
        $("#EditButton").on("click", () =>
        {
            $("#EditDialog").dialog("open")
        })
        $("#EditFirstName").addClass("ui-widget ui-widget-content ui-corner-all").on("input", checkEditInput)
        $("#EditLastName").addClass("ui-widget ui-widget-content ui-corner-all").on("input", checkEditInput)
        $("#EditDateOfBirth").datepicker().addClass("ui-widget ui-widget-content ui-corner-all").on("input", checkEditInput)
        $("#EditEmail").addClass("ui-widget ui-widget-content ui-corner-all").on("input", checkEditInput)

        $("#EditConfirm").button().on("click", editUser)

        $("#FeedButton").on("click", showFeed)
        $("#FriendsButton").on("click", showFriends)

        $("#NewsList").children("#PostFrame").children(".UserReference").each(function ()
        {
            $(this).on("click", selectUser)
        })

        $("#SelectedUserRole").selectmenu({
            change: (event, data) =>
            {
                updateRole(data.item.value)
            }
        })

        $("#SelectedUserStatus").selectmenu({
            change: (event, data) =>
            {
                updateStatus(data.item.value)
            }
        })

        $("#SelectedUserPersonalInfo").accordion({collapsible: true, active: false, animate: 50})

        $("#EditDialog").dialog({autoOpen: false})
    }

    $("#UserListFrame").children(".UserReference").each(function ()
    {
        $(this).on("click", selectUser)
    })
})

function checkEditInput()
{
    const name_regex = /^[A-Z][a-z]*$/g
    const date_regex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|(1|2)[0-9]|3(0|1))\/([0-9]{1,4})$/g
    const email_regex = /^([A-Z]|[a-z]|[0-9])+@([A-Z]|[a-z])+\.([A-Z]|[a-z])+$/g

    let first_name_value = $("#EditFirstName").val()
    let last_name_value = $("#EditLastName").val()
    let date_value = $("#EditDateOfBirth").val()
    let email_value = $("#EditEmail").val()

    if (first_name_value.search(name_regex) >= 0 && last_name_value.search(name_regex) >= 0 &&
        date_value.search(date_regex) >= 0 && email_value.search(email_regex) >= 0)
    {
        $("#EditConfirm").button("option", "disabled", false)
        console.log("unlock")
    } else
    {
        $("#EditConfirm").button("option", "disabled", true)
        console.log("block")
    }
}

function editUser()
{
    let first_name_value = $("#EditFirstName").val()
    let last_name_value = $("#EditLastName").val()
    let date_value = $("#EditDateOfBirth").val()
    let email_value = $("#EditEmail").val()
    $.ajax({
        url: `/${selected_user_id}/data`,
        method: "PUT",
        data: {
            first_name: first_name_value,
            last_name: last_name_value,
            date: date_value,
            email: email_value
        }
    }).done(() =>
    {
        setTimeout(() =>
        {
            location.reload()
        }, 500)
    })
}

function updateRole(new_role)
{
    $.ajax({
        url: `/${selected_user_id}/role`,
        method: "PUT",
        data: {role: new_role}
    })
}

function updateStatus(new_status)
{
    $.ajax({
        url: `/${selected_user_id}/status`,
        method: "PUT",
        data: {status: new_status}
    })
}

function showFeed()
{
    show_feed = !show_feed
    sendQuery()
}

function showFriends()
{
    show_friends = !show_friends
    sendQuery()
}

function sendQuery()
{
    let new_location = location.pathname
    if (show_feed || show_friends)
    {
        new_location += '?'
    }
    if (show_feed)
    {
        new_location += "feed"
    }
    if (show_feed && show_friends)
    {
        new_location += "&"
    }
    if (show_friends)
    {
        new_location += "friends"
    }
    location.assign(new_location)
}
