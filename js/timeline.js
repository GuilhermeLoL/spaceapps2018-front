$(function(){
    var logo = $('.logoText');
    var logoMini = $('.logoTextMini');

    var mobile = window.innerWidth < 700;
    if(mobile) {
      logo.css('position', 'relative');
      return;
    } else {
      logo.css('position', 'fixed');
    }
    setInterval(function () {
        if ($(window).scrollTop() >= 150) {
            logo.css("top", "-300px");
            logoMini.css("top", "0");
        } 
      else{
          logo.css("top", "0");
          logoMini.css("top", '-300px');
      }
    }, 300);
  });
new Vue({
  el:'#app',
  data: {
    list: []
  },
  created () {
    axios.get('http://34.211.242.70:3000/launches')
        .then(response => {
          let data = response.data.data
          let dataDate = data.filter(e => e.date !== '')
          dataDate.sort((a, b) => {
            return new Date(a.date) - new Date(b.date)
          })
          data = data.filter(e => e.date === '')
          data.forEach(e => {
            e.date = 'Soon...'
          })
          this.list = this.list.concat(dataDate)
          this.list = this.list.concat(data)
          let dateNow = new Date()
          let index = -1
          this.list.forEach((e, i) => {
            if (dateNow >= new Date(e.date)) {
              index = i + 1
            }
          })
          this.list = this.list.slice(index, -1)
        })
        .catch(error => {
            console.log(error)
        })
  }
})
