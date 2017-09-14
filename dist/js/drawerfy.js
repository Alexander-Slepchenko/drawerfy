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
          $this.data(namespace, { options: options });

          $(methods.options.open).on('click', function () {
            methods.show.call(_this);
          });

          $(methods.options.close).on('click', function () {
            methods.hide.call(_this);
          });

          $(methods.options.overlay).on('click', function () {
            methods.hide.call(_this);
          });
        }

      });
    },
    show: function () {
      $(this).addClass('show');
      $('body').addClass('active-menu');
      $(methods.options.wrapper).addClass('drawer-' + methods.options.type);
      $(methods.options.overlay).addClass('active');
    },
    hide: function () {
      $(this).removeClass('show');
      $('body').removeClass('active-menu');
      $(methods.options.wrapper).removeClass('drawer-' + methods.options.type);
      $(methods.options.overlay).removeClass('active');
    },
    destroy: function () {
      return this.each(function () {

        var _this = this;
        var $this = $(this);

        $(methods.options.open).off('click', function () {
          methods.show.call(_this);
        });

        $(methods.options.close).off('click', function () {
          methods.hide.call(_this);
        });

        $(methods.options.overlay).off('click', function () {
          methods.hide.call(_this);
        });

        $this
          .removeData(namespace)
          .remove();
      });
    }
  };

  $.fn.drawerfy = function (method) {
    if (methods[method]) {
      return methods[method].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.' + namespace);
    }
  };
})(jQuery);
