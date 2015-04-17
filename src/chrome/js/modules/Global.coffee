define ()->
  window._globals = {} if !window._globals?
  return {
    set:(name,value)->
      window._globals[name]=value
    get:(name)->
      rs = window._globals[name];
      if rs then return rs
      else return null
  }