(function ($) {

  'use strict';

  var namespace = 'drawerfy';

  var methods = {
    init: function (options) {
      methods.options = $.extend({
        open: '.drawer-open',
        close: '.drawer-close',
        type: 'slide-left',
        overlay: '.overlay',
        wrapper: '.wrapper'
      },options);

      return this.each(function () {

        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);

        if (!data) {

          $(methods.options.open).on('click.' + namespace, function (e) {
            e.preventDefault();
            methods.open.call(_this);
          });

          $(methods.options.close).on('click.' + namespace, function (e) {
            e.preventDefault();
            methods.close.call(_this);
          });

          $(methods.options.overlay).on('click.' + namespace, function (e) {
            e.preventDefault();
            methods.close.call(_this);
          });

          $this.data(namespace, { options: methods.options });

        }

      });
    },

    open: function () {
      var data = $(this).data(namespace);
      $(this).addClass('active');
      $('body').addClass('active-menu');
      $(methods.options.wrapper).addClass(data.options.type);
      $(methods.options.overlay).addClass('active');
    },

    close: function () {
      var data = $(this).data(namespace);
      $(this).removeClass('active');
      $('body').removeClass('active-menu');
      $(methods.options.wrapper).removeClass(data.options.type);
      $(methods.options.overlay).removeClass('active');
    },

    destroy: function () {
      return this.each(function () {

        var _this = this;
        var $this = $(this);

        $(methods.options.open).off('click.' + namespace, function () {
          methods.open.call(_this);
        });

        $(methods.options.close).off('click.' + namespace, function () {
          methods.close.call(_this);
        });

        $(methods.options.overlay).off('click.' + namespace, function () {
          methods.close.call(_this);
        });

        $this
          .removeData(namespace)
          .remove();
      });
    }
  };

  $.fn.drawerfy = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.' + namespace);
    }
  };
})(jQuery);
