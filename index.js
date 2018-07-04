var isFeed = require('ssb-ref').isFeed
var h = require('hyperscript')

exports.gives = {
  message: {
    meta: true
  }
}

exports.needs = {
  identity: { main: 'first' },
  avatar: {
    name: 'first', image: 'first'
  }
}

exports.create = function (api) {
  return { message: { meta: function (data) {
    if(!Array.isArray(data.value.content.recps)) return
    return h('div.Avatar', data.value.content.recps.map(function (e) {
      e = isFeed(e) ? e : isFeed(e.link) ? e.link : null
      if(e != api.identity.main() && e != data.value.author) {
        //hmm: maybe link to private threads by this id?
        var img = h('img')
        
        api.avatar.image(e, function (src) { img.src = src })
        return img
      }
    }).filter(Boolean))

  }}}
}











