(function(window) {

  'use strict';

  /**
   * Extend Object helper function.
   */
  function extend(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }

  /**
   * Each helper function.
   */
  function each(collection, callback) {
    for (var i = 0; i < collection.length; i++) {
      var item = collection[i];
      callback(item);
    }
  }

  /**
   * Menu Constructor.
   */
  function drawerfy(options) {
    this.options = extend({}, this.options);
    extend(this.options, options);
    this._init();
  }

  /**
   * Menu Options.
   */
  drawerfy.prototype.options = {
    wrapper: '.wrapper',
    type: 'slide-left',
    open: '.drawer-open',
    close: '.drawer-close',
    overlay: '.overlay'
  };

  /**
   * Initialise Menu.
   */
  drawerfy.prototype._init = function() {
    this.body = document.body;
    this.wrapper = document.querySelector(this.options.wrapper);
    this.overlay = document.querySelector(this.options.overlay);
    this.menu = document.querySelector('.drawer-' + this.options.type);
    this.closeMenu = document.querySelector(this.options.close);
    this.openMenu = document.querySelectorAll(this.options.open);
    this._initEvents();
  };

  /**
   * Initialise Menu Events.
   */
  drawerfy.prototype._initEvents = function() {
    this.openMenu.addEventListener('click', function(e){      
      e.preventDefault();
      this.open();
    }.bind(this));
    
    this.closeMenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.close();
    }.bind(this));

   
    this.overlay.addEventListener('click', function(e) {
      e.preventDefault();
      this.close();
    }.bind(this));
  };

  /**
   * Open Menu.
   */
  drawerfy.prototype.open = function() {
    this.body.classList.add('active-menu');
    this.wrapper.classList.add('active-' + this.options.type);
    this.menu.classList.add('active');
    this.overlay.classList.add('active');
    this.disableMenuOpeners();
  };

  /**
   * Close Menu.
   */
  drawerfy.prototype.close = function() {
    this.body.classList.remove('active-menu');
    this.wrapper.classList.remove('active-' + this.options.type);
    this.menu.classList.remove('active');
    this.overlay.classList.remove('active');
    this.enableMenuOpeners();
  };

  /**
   * Disable Menu Openers.
   */
  drawerfy.prototype.disableMenuOpeners = function() {
    each(this.openMenu, function(item) {
      item.disabled = true;
    });
  };

  /**
   * Enable Menu Openers.
   */
  drawerfy.prototype.enableMenuOpeners = function() {
    each(this.openMenu, function(item) {
      item.disabled = false;
    });
  };

  /**
   * Add to global namespace.
   */
  window.drawerfy = drawerfy;

})(window);
