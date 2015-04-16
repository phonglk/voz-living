define ()->
  $(".middleads+table > tbody > tr > td:eq(1)").remove()  if $(".middleads+table > tbody > tr > td:eq(1) [id^=div-gpt-ad]").length > 0
  $(".middleads+div > table > tbody > tr > td:eq(1)").remove()
  $("[id^=div-gpt-ad]").hide()
  $("[id^=google_ads_div],.middleads").hide()
  $(".page").css
    width: "100%"
    "max-width": "5000px"
  return