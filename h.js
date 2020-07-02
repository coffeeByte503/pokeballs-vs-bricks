var app;
$.support.cors = !0;
var countPackageOptions,
  APP = "",
  colors = {
    "icon.cat1": "5c973b",
    "icon.catx": "942468",
    "icon.caty": "416dc7",
    "icon.catz": "d07f30",
  },
  rootServices = "assets/data/",
  splash = "splash_bkn.jsp",
  home = "index.php",
  balance = "query_balance.php",
  loyalty = "loyalty.php",
  dod = "query_dod.php",
  category = "category_index.php",
  product = "product.php",
  confirm = "confirm.php",
  ttp = "confirm.php",
  prd = "confirm.php",
  zero = "zero_balance_bkn.jsp",
  action = "customer_action.jsp";
(APP = APP || {}),
  (APP = {
    srvSession: "",
    srvHeader: "",
    srvBody: "",
    counter: 0,
    timeInterval: "",
    interval: 6e4,
    deg: 0,
    idValue: "",
    printInfo: "",
    sectionColor: "",
    sectionTitle: "",
    styleClass: "",
    contentString: "",
    iconSelected: "icon-default",
    getAllParameters: function () {
      var t = [],
        e = location.href.split("?");
      return e.length > 1 && (t = e[1].split("&")), t;
    },
    getParameter: function (t) {
      var e,
        a = null,
        o = APP.getAllParameters();
      for (e = 0; e < o.length; e += 1)
        if (o[e].split("=")[0] === t) {
          a = o[e];
          break;
        }
      return a;
    },
    parameterHasValue: function (t, e) {
      var a = !1,
        o = APP.getParameter(t);
      return (
        null !== o && 2 === o.split("=").length && (a = o.split("=")[1] === e),
        a
      );
    },
    printListInfo: function (t) {
      return $.each(t, function (e) {
        t[e] = t[e].replace(
          /(icon[.]\w+)/g,
          '<img src="assets/img/$1.png" alt="$1">'
        );
      });
    },
    formFieldStyle: function (t, e) {
      "full" === APP.printInfo[t].form[e].location
        ? (APP.styleClass = "100%")
        : (APP.styleClass = APP.printInfo[t].form[e].location);
    },
    hidePreload: function () {
      setTimeout(function () {
        $("#preload").addClass("is--hide").css({ zIndex: -1 });
      }, 150);
    },
    loadHeader: function (t) {
      $("#number").html(t.msisdn),
        $("#current").html("$" + t.balance),
        $("#percent")
          .stop()
          .delay(400)
          .animate({ width: t.capacity_proportion }, 600),
        $("#consumed").html(t.capacity_consumed),
        $("#assigned").html(t.capacity_assigned),
        $("#proportion").html(t.capacity_proportion),
        "index" === $(".content").attr("data-section") &&
          ($("#bannerBottomLink").attr("href", t.bottom_banner.referer),
          $("#bannerBottomImg").attr(
            "src",
            "assets/img/" + t.bottom_banner.image + ".jpg"
          ));
    },
    loadBody: function (t) {
      var e,
        a,
        o,
        n,
        i,
        r,
        c,
        l = 0;
      if (
        ("splash" === $(".content").attr("data-section") &&
          void 0 !== t.free_text &&
          ((e = (e = (e = t.free_text).replace("[b]", "<strong>")).replace(
            "[/b]",
            "</strong>"
          )),
          $("#splash--id").hide().html(e)),
        "index" === $(".content").attr("data-section") &&
          (void 0 !== t.loyalty_banner &&
            "true" == t.loyalty_banner.value &&
            jQuery("section.user--info").after(
              '<section class="loyalty" id="banner_loyalty"><a href="' +
                t.loyalty_banner.referer +
                '"><div class="loyalty--box"><span class="icon"><img src="assets/img/' +
                t.loyalty_banner.image +
                '"></span></div></a></section>'
            ),
          void 0 !== t.dod_banner &&
            jQuery("section.user--info").after(
              '<section class="navegacion--libre" id="dod_banner"><div class="dod_banner"><div class="column--left"><h3>' +
                t.dod_banner.dod_label +
                "</h3><h2>" +
                t.dod_banner.dod_status +
                '</h2></div><div class="column--right"><h2>' +
                t.dod_banner.dod_consumption +
                "</h2></div></div></section>"
            ),
          void 0 !== t.tabs_array &&
            ($("#tab--link1").attr("href", t.tabs_array[0].referer),
            $("#tab--link2").attr("href", t.tabs_array[1].referer),
            $("#tab--title1").html(t.tabs_array[0].text),
            $("#tab--title2").html(t.tabs_array[1].text)),
          void 0 !== t.categories_table))
      )
        for (l = 0; l < t.categories_table.length; l += 1) {
          (APP.contentString =
            '<a class="category_container btn--categorie" data-icon="' +
            t.categories_table[l].icon +
            '" data-href="' +
            t.categories_table[l].referer +
            '" id="btn--categorie' +
            l +
            '"><figure><img src="assets/img/' +
            t.categories_table[l].icon +
            '.png" alt="' +
            t.categories_table[l].icon +
            '"></figure><p class="btn--categorieColor">' +
            t.categories_table[l].text +
            "</p></a>"),
            $("#categories").append(APP.contentString);
          for (var s in colors)
            if (colors.hasOwnProperty(s)) {
              if (s === t.categories_table[l].icon) {
                $(".btn--categorie").eq(l).attr("data-color", colors[s]),
                  $(".btn--categorie")
                    .eq(l)
                    .find(".btn--categorieColor")
                    .attr("style", "color: #" + colors[s] + ";");
                break;
              }
              $(".btn--categorie").eq(l).attr("data-color", "#001d2d"),
                $(".btn--categorie")
                  .eq(l)
                  .find(".btn--categorieColor")
                  .attr("style", "color: #001d2d;");
            } else
              $(".btn--categorie").eq(l).attr("data-color", "#001d2d"),
                $(".btn--categorie")
                  .eq(l)
                  .find(".btn--categorieColor")
                  .attr("style", "color: #001d2d;");
        }
      if ("index_loyalty" === $(".content").attr("data-section")) {
        if (
          (void 0 !== t.tabs_array &&
            ($("#tab--link1").attr("href", t.tabs_array[0].referer),
            $("#tab--link2").attr("href", t.tabs_array[1].referer),
            $("#tab--title1").html(t.tabs_array[0].text),
            $("#tab--title2").html(t.tabs_array[1].text)),
          void 0 !== t.loyalty_info)
        ) {
          var d = t.loyalty_info[0].label,
            p = t.loyalty_info[0].value,
            P = t.loyalty_info[1].label,
            f = t.loyalty_info[1].value,
            m = t.loyalty_info[2].label,
            g = t.loyalty_info[2].value;
          jQuery("main.content.home.home-premios div#table").html(
            '<table><tr><td class="title">' +
              d +
              '</td><td class="valor-field">' +
              p +
              '</td></tr><tr><td class="title">' +
              P +
              '</td><td class="valor-field">' +
              f +
              '</td></tr><tr><td class="title">' +
              m +
              '</td><td class="valor-field">' +
              g +
              "</td></tr></table>"
          );
        }
        void 0 !== t.prizes_info &&
          $(t.prizes_info.content).each(function (t, e) {
            var a = e.data[0].package_name,
              o = e.data[0].package_validity,
              n = e.data[1].package_price,
              i = e.referer;
            jQuery("main.content.home.home-premios div#table-premios").append(
              '<div class="premio-conent"><div class="info-premio"><h2>' +
                a +
                '</h2><ul class="beneficios"></ul><p class="vigencia">Vigencia de ' +
                o +
                '</p></div><div class="canjear"><a href="' +
                i +
                '">' +
                n +
                "</a></div></div>"
            );
            var r = e.data[0].package_benefits;
            $(r).each(function (t, e) {
              var a = e;
              jQuery(
                "main.content.home-premios div#table-premios .info-premio ul.beneficios"
              ).append("<li>" + a + "</li>");
            });
          });
      }
      if (
        ("query_dod" === $(".content").attr("data-section") &&
          (jQuery("section#dod .navLibre span").html(t.mb_amnt),
          jQuery("section#dod .saldoConsumido span").html(t.bal_amnt),
          jQuery("section#dod a.desactivar").attr("href", t.cancel_action),
          jQuery("section#dod a.descarga").attr("href", t.tshop_link)),
        "category_index" === $(".content").attr("data-section"))
      ) {
        if (
          ($(".print--info").empty(),
          APP.loadHeader(APP.srvHeader),
          void 0 !== t.packages_table.content)
        )
          for (l = 0; l < t.packages_table.content.length; l += 1)
            (n =
              "0" !== t.packages_table.content[l].data[1].package_price
                ? "$" + t.packages_table.content[l].data[1].package_price
                : "Gratis"),
              (APP.contentString =
                '<div class="row row--item"><div class="column--left"><h3 class="item--title">' +
                t.packages_table.content[l].data[0].package_name +
                '</h3><h4 class="item--info"></h4><h6 class="item--date">Vigencia de ' +
                t.packages_table.content[l].data[0].package_validity +
                '</h6></div><div class="column--right"><a class="btn--action" href="' +
                t.packages_table.content[l].referer +
                '">' +
                n +
                "</a></div></div>"),
              $("#products").append(APP.contentString),
              void 0 !== t.packages_table.content[l].special_type &&
                $(".row--item")
                  .eq(l)
                  .addClass(t.packages_table.content[l].special_type),
              void 0 !== t.packages_table.content[l].data[0].package_benefits &&
                ((o = t.packages_table.content[l].data[0].package_benefits),
                APP.printListInfo(o),
                (o = (o = o.toString()).replace(/\,/g, " + ")),
                $(".item--info")
                  .eq(l)
                  .append("<span>" + o + "</span>"));
        localStorage.setItem("products", $("#products").html());
      }
      if (
        ("product" === $(".content").attr("data-section") &&
          ($("#products").html(localStorage.getItem("products")),
          $(".print--item").empty(),
          void 0 !== t.info_container[0].panels[0] &&
            ((APP.printInfo = t.info_container[0].panels[0]),
            (APP.iconSelected = localStorage.getItem("icon")),
            (APP.iconSelected = APP.iconSelected.split(".")),
            (APP.iconSelected = APP.iconSelected[1]),
            (APP.contentString =
              '<div class="row row--item"><div class="column--total"><h3 class="item--title">' +
              APP.printInfo.data[0].package_name +
              '</h3><ul class="item--list"><li class="item--benefits"><span class="icon--list icon--selected"><img src="assets/img/icon.' +
              APP.iconSelected +
              '-small.png"></span></li><li class="item--time"><span class="icon--list icon--time"></span>Vigencia de ' +
              APP.printInfo.data[0].package_validity +
              '</li><li class="item--price"><span class="icon--list icon--money"></span>' +
              APP.printInfo.data[0].package_price +
              '</li></ul></div></div><div class="row row--item row--actions"><div class="column--left"><a class="btn--action ' +
              APP.printInfo.data[0].package_options[0].button_type +
              '" href="' +
              APP.printInfo.data[0].package_options[0].referer +
              '">' +
              APP.printInfo.data[0].package_options[0].button_text +
              '</a></div><div class="column--right"><a class="btn--action ' +
              APP.printInfo.data[0].package_options[1].button_type +
              '" href="' +
              APP.printInfo.data[0].package_options[1].referer +
              '">' +
              APP.printInfo.data[0].package_options[1].button_text +
              "</a></div></div>"),
            $("#productDetail").append(APP.contentString)),
          void 0 !== APP.printInfo.data[0].package_benefits &&
            ((o = APP.printInfo.data[0].package_benefits),
            APP.printListInfo(o),
            (o = (o = o.toString()).replace(/\,/g, "<br>+ ")),
            $(".item--benefits")
              .eq(0)
              .append("<span>" + o + "</span>"))),
        "query_balance" === $(".content").attr("data-section") &&
          (void 0 !== t.tabs_array[0] &&
            void 0 !== t.tabs_array[1] &&
            ($("#tab--link1").attr("href", t.tabs_array[0].referer),
            $("#tab--link2").attr("href", t.tabs_array[1].referer),
            $("#tab--title1").html(t.tabs_array[0].text),
            $("#tab--title2").html(t.tabs_array[1].text)),
          void 0 !== t.info_container[0].panels &&
            ($(".row--container").prepend(
              '<h2 class="title-row">' + t.info_container[0].title + "</h2>"
            ),
            $.each(t.info_container[0].panels, function (t, e) {
              (APP.contentString =
                '<div class="queue_container"><div class="row row-left"><h3>' +
                e.status +
                '</h3></div><div class="row row-right"><p><span>' +
                e.capacity_consumed +
                "</span> de <span>" +
                e.capacity_assigned +
                "</span> (" +
                e.capacity_proportion +
                ')</p><div class="status-bar"><div class="progress"><span class="percent--print--info" style="width: ' +
                e.capacity_proportion +
                ';"></span></div></div></div></div>'),
                $(".row--container").append(APP.contentString);
            })),
          void 0 !== t.info_container[1].panels &&
            ($(".call--container").prepend(
              '<h2 class="title-row">' + t.info_container[1].title + "</h2>"
            ),
            $.each(t.info_container[1].panels, function (t, e) {
              var a = e.balance_amount;
              (a = (a = a.replace("[b]", "<b>")).replace("[/b]", "</b>")),
                (APP.contentString =
                  '<div class="row row_app"><div class="column--total"><div class="row"><div class="column--left"><h4>' +
                  e.balance_name +
                  '</h4></div><div class="column--right"><h3>' +
                  a +
                  '</h3></div></div><div class="row"><div class="column--left"><h4>Vence</h4></div><div class="column--right"><h5>' +
                  e.expiration +
                  "</h5></div></div></div></div>"),
                $(".call--container").append(APP.contentString);
            })),
          void 0 !== t.info_container[2].panels &&
            ($(".apps--container").prepend(
              '<h2 class="title-row">' + t.info_container[2].title + "</h2>"
            ),
            $.each(t.info_container[2].panels, function (t, e) {
              var a = e.description.split(" "),
                o = e.expiration.split(" [p]"),
                n = a.splice(1);
              (n = (n = n.join()).replace(/\,/g, " ")),
                (APP.contentString =
                  '<div class="row row_app"><div class="column--left"><img src="assets/img/' +
                  a[0] +
                  '.png"><h3>' +
                  n +
                  '</h3></div><div class="column--right"><div class="expiration"><span>' +
                  o[0] +
                  "</span>" +
                  o[1] +
                  "</div></div></div>"),
                $(".apps--container").append(APP.contentString);
            })),
          void 0 !== t.info_container[3].panels &&
            ($(".subscriptions--container").prepend(
              '<h2 class="title-row">' + t.info_container[3].title + "</h2>"
            ),
            $.each(t.info_container[3].panels, function (t, e) {
              "Navegación Libre" == e.description
                ? ((APP.contentString =
                    '<div class="row row_app"><div class="column--left"><h3>' +
                    e.description +
                    '</h3></div><div class="column--right"><a class="btn--action button" href="' +
                    e.button.referer +
                    '">' +
                    e.button.text +
                    "</a></div></div>"),
                  $(".subscriptions--container").append(APP.contentString))
                : ((APP.contentString =
                    '<div class="row row_app"><div class="column--left"><h3>' +
                    e.description +
                    "</h3><h5>Próx. Renovación: " +
                    e.next_renewal +
                    '</h5></div><div class="column--right"><h3 class="text--center price--item">' +
                    e.price +
                    '</h3><a class="btn--action button" href="' +
                    e.button.referer +
                    '">' +
                    e.button.text +
                    "</a></div></div>"),
                  $(".subscriptions--container").append(APP.contentString));
            }))),
        "confirm_renov" === $(".content").attr("data-section") &&
          ($("#confirm").html(localStorage.getItem("products")),
          $(".print--item").empty(),
          void 0 !== t.info_container[0].panels[0] &&
            ((APP.printInfo = t.info_container[0].panels[0]),
            $("#title--menu").html(t.info_container[0].title),
            (APP.contentString =
              '<div class="row row--item"><div class="column--total"><h3 class="item--title">' +
              APP.printInfo.data[0].package_name +
              '</h3></div></div><div class="row row--item row--actions"><div class="column--left"><a class="btn--action ' +
              APP.printInfo.data[0].package_options[0].button_class +
              '" href="' +
              APP.printInfo.data[0].package_options[0].referer +
              '">' +
              APP.printInfo.data[0].package_options[0].button_text +
              '</a></div><div class="column--right"><a class="btn--action ' +
              APP.printInfo.data[0].package_options[1].button_class +
              '" href="' +
              APP.printInfo.data[0].package_options[1].referer +
              '">' +
              APP.printInfo.data[0].package_options[1].button_text +
              "</a></div></div>"),
            $("#productRenov").append(APP.contentString))),
        "confirm_ttp" === $(".content").attr("data-section") &&
          ($("#confirm").html(localStorage.getItem("products")),
          $(".print--item").empty(),
          void 0 !== t.info_container[0].panels[0] &&
            ((APP.printInfo = t.info_container[0].panels[0]),
            (a = (a = (a = APP.printInfo.data[0].package_name).replace(
              "[b]",
              "<strong>"
            )).replace("[/b]", "</strong>")),
            $("#title--menu").html(t.info_container[0].title),
            (APP.contentString =
              '<div class="row row--item"><div class="column--total"><h3 class="item--title">' +
              a +
              '</h3><h3 class="item--benefits"></h3><h3>' +
              APP.printInfo.data[0].package_price +
              '</h3></div></div><div class="row row--item row--actions"><div class="column--left"><a class="btn--action button_cancel" href="' +
              APP.printInfo.data[0].package_options[0].referer +
              '">' +
              APP.printInfo.data[0].package_options[0].button_text +
              '</a></div><div class="column--right"><a class="btn--action" href="' +
              APP.printInfo.data[0].package_options[1].referer +
              '">' +
              APP.printInfo.data[0].package_options[1].button_text +
              "</a></div></div>"),
            $("#productTtp").append(APP.contentString)),
          void 0 !== APP.printInfo.data[0].package_benefits &&
            ((o = APP.printInfo.data[0].package_benefits),
            APP.printListInfo(o),
            (o = (o = o.toString()).replace(/\,/g, " ")),
            $(".item--benefits")
              .eq(0)
              .append("<span>" + o + "</span>"))),
        "confirm_prd" === $(".content").attr("data-section") &&
          ($("#confirm").html(localStorage.getItem("products")),
          $(".print--item").empty(),
          void 0 !== t.info_container[0].panels[0] &&
            ((APP.printInfo = t.info_container[0].panels[0]),
            (countPackageOptions =
              APP.printInfo.data[0].package_options.length),
            $("#title--menu").html(t.info_container[0].title),
            (APP.printInfo.data[0].package_name = APP.printInfo.data[0].package_name.replace(
              /(icon[.]\w+)/g,
              '<img src="assets/img/$1.png" alt="$1">'
            )),
            1 === countPackageOptions
              ? ((APP.contentString =
                  '<div class="row row--item"><div class="column--total"><h3 class="item--title row_app">' +
                  APP.printInfo.data[0].package_name +
                  '</h3></div></div><div class="row row--item row--actions"><div class="column--total"><a class="btn--action ' +
                  APP.printInfo.data[0].package_options[0].button_class +
                  '" href="' +
                  APP.printInfo.data[0].package_options[0].referer +
                  '">' +
                  APP.printInfo.data[0].package_options[0].button_text +
                  "</a></div></div>"),
                $("#productPrd").append(APP.contentString))
              : ((APP.contentString =
                  '<div class="row row--item"><div class="column--total"><h3 class="item--title row_app">' +
                  APP.printInfo.data[0].package_name +
                  '</h3></div></div><div class="row row--item row--actions"><div class="column--left"><a class="btn--action ' +
                  APP.printInfo.data[0].package_options[0].button_class +
                  '" href="' +
                  APP.printInfo.data[0].package_options[0].referer +
                  '">' +
                  APP.printInfo.data[0].package_options[0].button_text +
                  '</a></div><div class="column--right"><a class="btn--action ' +
                  APP.printInfo.data[0].package_options[1].button_class +
                  '" href="' +
                  APP.printInfo.data[0].package_options[1].referer +
                  '">' +
                  APP.printInfo.data[0].package_options[1].button_text +
                  "</a></div></div>"),
                $("#productPrd").append(APP.contentString)))),
        "zero_balance" === $(".content").attr("data-section") &&
          (void 0 !== t.info_container[0] &&
            ("" !== t.info_container[0].title
              ? $("#title--menu").html(t.info_container[0].title)
              : $(".notification--label").hide()),
          void 0 !== t.info_container[1].panels))
      )
        for (
          APP.printInfo = t.info_container[1].panels, l = 0;
          l < APP.printInfo.length;
          l += 1
        ) {
          for (
            i = APP.printInfo[l].form[0].values,
              APP.contentString =
                '<form action="' +
                APP.printInfo[l].referer +
                '" class="form__info"><div class="row row--item"><div class="column--total"><h2 class="block--title">' +
                APP.printInfo[l].title +
                '</h2><h3 class="item--title">' +
                APP.printInfo[l].text +
                '</h3><div class="form__fields"></div></div></div></form>',
              $("#confirm").append(APP.contentString),
              c = 0;
            c < APP.printInfo[l].form.length;
            c += 1
          )
            "select" === APP.printInfo[l].form[c].type &&
              (APP.formFieldStyle(l, c),
              (APP.contentString =
                '<p style="width: ' +
                APP.styleClass +
                ';"><select class="form__select" id="selectId' +
                l +
                '"></select></p>'),
              $(".form__fields").eq(l).append(APP.contentString)),
              "text" === APP.printInfo[l].form[c].type &&
                (APP.formFieldStyle(l, c),
                (APP.contentString =
                  '<p class="inputNumber" style="width: ' +
                  APP.styleClass +
                  ';"><input class="form__input" id="inputId' +
                  l +
                  '" placeholder="Ingrese el valor..." type="number" min="1" value="1"></p>'),
                $(".form__fields").eq(l).append(APP.contentString)),
              "button" === APP.printInfo[l].form[c].type &&
                (APP.formFieldStyle(l, c),
                (APP.contentString =
                  '<p style="width: ' +
                  APP.styleClass +
                  ';"><button class="btn--action form__submit" id="submitId' +
                  l +
                  '" type="submit">' +
                  APP.printInfo[l].form[c].text +
                  "</button></p>"),
                $(".form__fields").eq(l).append(APP.contentString));
          for (r in i)
            i.hasOwnProperty(r) &&
              ((APP.contentString =
                '<option value="' + r + '">' + i[r] + "</option>"),
              $("#selectId" + l).append(APP.contentString));
        }
    },
    printModal: function (t) {
      (APP.idValue = "?" + t), APP.callData(product, APP.idValue);
    },
    openModal: function (t) {
      $(".modal__wrapper").removeClass("is--active"),
        $("#" + t).addClass("is--active");
    },
    closeModal: function () {
      $(".content").removeAttr("data-info"),
        $(".modal__wrapper").removeClass("is--active");
    },
    addTime: function () {
      (APP.counter = APP.counter + 1), $("#counter").html(APP.counter);
    },
    callData: function (t, e) {
      "category_index" !== $(".content").attr("data-section") &&
        $(".print--info").empty();
      try {
        localStorage.setItem("normalBrowser", !0),
          -1 === e.indexOf("null")
            ? $.ajax({
                data: {},
                timeout: 2e4,
                type: "GET",
                dataType: "json",
                url: rootServices + t + e,
              })
                .done(function (t, e, a) {
                  (APP.srvSession = t.auth_vars),
                    (APP.srvHeader = t.header),
                    (APP.srvBody = t.body),
                    void 0 !== APP.srvSession
                      ? "" !== APP.srvSession.sessionid &&
                        null !== APP.srvSession.sessionid &&
                        void 0 !== APP.srvSession.sessionid
                        ? ("" !== localStorage.getItem("token") &&
                            localStorage.setItem(
                              "token",
                              "sessionid=" + APP.srvSession.sessionid
                            ),
                          APP.loadHeader(APP.srvHeader),
                          APP.loadBody(APP.srvBody))
                        : (window.location.href = "error_3g.jsp")
                      : (window.location.href = "splash.jsp");
                })
                .fail(function (t, e, a) {
                  window.location.href = "error_time.jsp";
                })
                .always(function () {
                  APP.hidePreload();
                })
            : (window.location.href = "splash.jsp");
      } catch (t) {
        window.location.href = "private.jsp";
      }
    },
    jsEvents: function () {
      switch ($(".content").attr("data-section")) {
        case "splash":
          APP.callData(splash, APP.idValue);
          break;
        case "index":
          (APP.idValue = "?" + localStorage.getItem("token")),
            APP.callData(home, APP.idValue);
          break;
        case "index_loyalty":
          (APP.idValue = "?" + localStorage.getItem("token")),
            APP.callData(loyalty, APP.idValue);
          break;
        case "query_balance":
          (APP.idValue = "?" + localStorage.getItem("token")),
            APP.callData(balance, APP.idValue),
            (APP.timeInterval = setInterval(APP.addTime, APP.interval));
          break;
        case "query_dod":
          (APP.idValue = "?" + localStorage.getItem("token")),
            APP.callData(dod, APP.idValue);
          break;
        case "category_index":
          (APP.sectionColor = localStorage.getItem("color")),
            (APP.sectionTitle = localStorage.getItem("title")),
            $(".label--bg").css({ backgroundColor: "#" + APP.sectionColor }),
            $(".back--label").css({ color: "#" + APP.sectionColor }),
            $("#title--menu").html(APP.sectionTitle),
            (APP.idValue =
              "?" +
              localStorage.getItem("token") +
              "&" +
              APP.getParameter("category_id")),
            APP.callData(category, APP.idValue);
          break;
        case "product":
          (APP.sectionColor = localStorage.getItem("color")),
            (APP.sectionTitle = localStorage.getItem("title")),
            $(".label--bg").css({ backgroundColor: "#" + APP.sectionColor }),
            $(".back--label").css({ color: "#" + APP.sectionColor }),
            $(".modal__wrapper--info").css({
              borderTopColor: "#" + APP.sectionColor,
            }),
            $(".modal__wrapper--info .item--title").css({
              color: "#" + APP.sectionColor,
            }),
            $("#title--menu").html(APP.sectionTitle),
            (APP.idValue =
              "?" +
              localStorage.getItem("token") +
              "&" +
              APP.getParameter("prod_id")),
            APP.callData(product, APP.idValue),
            APP.openModal("modalProduct");
          break;
        case "confirm_renov":
          (APP.sectionColor = localStorage.getItem("color")),
            $(".label--bg").css({ backgroundColor: "#" + APP.sectionColor }),
            $(".back--label").css({ color: "#" + APP.sectionColor }),
            $(".modal__wrapper--info").css({
              borderTopColor: "#" + APP.sectionColor,
            }),
            (APP.idValue =
              "?" +
              localStorage.getItem("token") +
              "&" +
              APP.getParameter("option") +
              "&" +
              APP.getParameter("prod_id")),
            APP.callData(confirm, APP.idValue),
            APP.openModal("modalRenov");
          break;
        case "confirm_ttp":
          (APP.sectionColor = localStorage.getItem("color")),
            $(".label--bg").css({ backgroundColor: "#" + APP.sectionColor }),
            $(".back--label").css({ color: "#" + APP.sectionColor }),
            $(".modal__wrapper--info").css({
              borderTopColor: "#" + APP.sectionColor,
            }),
            (APP.idValue =
              "?" +
              localStorage.getItem("token") +
              "&" +
              APP.getParameter("option") +
              "&" +
              APP.getParameter("prod_id")),
            APP.callData(ttp, APP.idValue),
            APP.openModal("modalTtp");
          break;
        case "confirm_prd":
          (APP.sectionColor = localStorage.getItem("color")),
            $(".label--bg").css({ backgroundColor: "#" + APP.sectionColor }),
            $(".back--label").css({ color: "#" + APP.sectionColor }),
            $(".modal__wrapper--info").css({
              borderTopColor: "#" + APP.sectionColor,
            }),
            (APP.idValue =
              "?" +
              localStorage.getItem("token") +
              "&" +
              APP.getParameter("option") +
              "&" +
              APP.getParameter("prod_id")),
            APP.callData(prd, APP.idValue),
            APP.openModal("modalPrd");
          break;
        case "zero_balance":
          (APP.idValue = "?" + localStorage.getItem("token")),
            APP.callData(zero, APP.idValue);
          break;
        default:
          setTimeout(function () {
            $("#preload").addClass("is--hide").css({ zIndex: -1 });
          }, 150);
      }
      $(window).on("load", function () {
        $(document).on("click", ".btn--categorie", function () {
          var t = $(this).attr("data-color"),
            e = $(this).attr("data-icon"),
            a = $(this).find("p").text(),
            o = $(this).attr("data-href");
          localStorage.setItem("color", t),
            localStorage.setItem("icon", e),
            localStorage.setItem("title", a),
            setTimeout(function () {
              window.location.href = o;
            }, 50);
        }),
          $(".btn--time").on("click", function () {
            $("#preload").css({ zIndex: 99 }),
              setTimeout(function () {
                $("#preload").removeClass("is--hide");
              }, 150),
              setTimeout(function () {
                (APP.deg = APP.deg + 360),
                  $(".info--wrapper").html(""),
                  APP.callData(balance, APP.idValue),
                  $("#time--icon").css(
                    { transform: "rotate(" + APP.deg + "deg)" },
                    600
                  ),
                  clearInterval(APP.timeInterval),
                  (APP.counter = 0),
                  $("#counter").html(APP.counter),
                  (APP.timeInterval = setInterval(APP.addTime, APP.interval));
              }, 400);
          }),
          $(".inputNumber").on("keydown", function (t) {
            -1 !== $.inArray(t.keyCode, [46, 8, 9, 27, 13, 110, 190]) ||
              (65 === t.keyCode && (!0 === t.ctrlKey || !0 === t.metaKey)) ||
              (t.keyCode >= 35 && t.keyCode <= 40) ||
              ((t.shiftKey || t.keyCode < 48 || t.keyCode > 57) &&
                (t.keyCode < 96 || t.keyCode > 105) &&
                t.preventDefault());
          });
      });
    },
    init: function () {
      APP.jsEvents();
    },
  }).init();
