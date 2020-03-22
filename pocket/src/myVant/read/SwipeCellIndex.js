// Utils
import {createNamespace} from '../utils';
import {range} from '../utils/format/number';
import {preventDefault} from '../utils/dom/event'; // Mixins

import {TouchMixin} from '../mixins/touch';
import {ClickOutsideMixin} from '../mixins/click-outside';

var _createNamespace = createNamespace('swipe-cell'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

// Threshold
var THRESHOLD = 0.15;
export default createComponent({
  mixins: [TouchMixin, ClickOutsideMixin({
    event: 'touchstart',
    method: 'onClick'
  })],
  props: {
    // @deprecated
    // should be removed in next major version, use beforeClose instead
    onClose: Function,
    disabled: Boolean,
    leftWidth: [Number, String],
    rightWidth: [Number, String],
    beforeClose: Function,
    stopPropagation: Boolean,
    iPoint: Array,
    name: {
      type: [Number, String],
      default: ''
    }
  },
  data: function data() {
    return {
      offset: 0,
      dragging: false
    };
  },
  computed: {
    computedLeftWidth: function computedLeftWidth() {
      //如果有自定义,优先使用自定义
      return +this.leftWidth || this.getWidthByRef('left');
    },
    computedRightWidth: function computedRightWidth() {
      return +this.rightWidth || this.getWidthByRef('right');
    }
  },
  mounted: function mounted() {
    // this.$el获取Vue实例使用的根 DOM 元素
    // 手动绑定事件
    this.bindTouchEvent(this.$el);
  },
  methods: {
    getWidthByRef: function getWidthByRef(ref) {
      if (this.$refs[ref]) {
        var rect = this.$refs[ref].getBoundingClientRect();
        return rect.width;
      }

      return 0;
    },
    // @exposed-api
    open: function open(position) {
      var offset = position === 'left' ? this.computedLeftWidth : -this.computedRightWidth;
      this.opened = true;
      // 如果没有完全打开, 这一行会使swipeCell完全打开(到指定值位置)
      this.offset = offset;
      this.$emit('open', {
        position: position,
        name: this.name,
        // @deprecated
        // should be removed in next major version
        detail: this.name
      });
    },
    // @exposed-api
    close: function close(position) {
      this.offset = 0;

      if (this.opened) {
        this.opened = false;
        this.$emit('close', {
          position: position,
          name: this.name
        });
      }
    },
    onTouchStart: function onTouchStart(event) {
      // event是touch事件
      if (this.disabled) {
        return;
      }

      this.startOffset = this.offset;
      // console.log(this.startOffset)
      // console.log(event)
      this.touchStart(event);
      // console.log(this.touchStart(event))
    },
    onTouchMove: function onTouchMove(event) {
      // console.log(event)
      if (this.disabled) {
        return;
      }

      this.touchMove(event);

      if (this.direction === 'horizontal') {
        this.dragging = true;
        this.lockClick = true;
        var isPrevent = !this.opened || this.deltaX * this.startOffset < 0;

        if (isPrevent) {
          preventDefault(event, this.stopPropagation);
        }

        this.offset = range(this.deltaX + this.startOffset, -this.computedRightWidth, this.computedLeftWidth);
      }
    },
    onTouchEnd: function onTouchEnd() {
      var _this = this;

      if (this.disabled) {
        return;
      }

      if (this.dragging) {
        this.toggle(this.offset > 0 ? 'left' : 'right');
        this.dragging = false; // compatible with desktop scenario

        setTimeout(function () {
          _this.lockClick = false;
        }, 0);
      }
    },
    toggle: function toggle(direction) {
      var offset = Math.abs(this.offset);
      var threshold = this.opened ? 1 - THRESHOLD : THRESHOLD;
      var computedLeftWidth = this.computedLeftWidth,
          computedRightWidth = this.computedRightWidth;

      if (computedRightWidth && direction === 'right' && offset > computedRightWidth * threshold) {
        this.open('right');
      } else if (computedLeftWidth && direction === 'left' && offset > computedLeftWidth * threshold) {
        this.open('left');
      } else {
        this.close();
      }
    },
    onClick: function onClick(position) {
      if (position === void 0) {
        position = 'outside';
      }

      this.$emit('click', position);

      if (this.opened && !this.lockClick) {
        if (this.beforeClose) {
          this.beforeClose({
            position: position,
            name: this.name,
            instance: this
          });
        } else if (this.onClose) {
          this.onClose(position, this, {
            name: this.name
          });
        } else {
          this.close(position);
        }
      }
    },
    getClickHandler: function getClickHandler(position, stop) {
      var _this2 = this;

      return function (event) {
        if (stop) {
          event.stopPropagation();
        }

        _this2.onClick(position);
      };
    },
    genLeftPart: function genLeftPart() {
      var h = this.$createElement;
      var content = this.slots('left');

      // console.log(this.slots('left'));
      if (content) {
        return h("div", {
          "ref": "left",
          "class": bem('left'),
          "on": {
            "click": this.getClickHandler('left', true)
          }
        }, [content]);
      }
    },
    genRightPart: function genRightPart() {
      var h = this.$createElement;
      var content = this.slots('right');

      if (content) {
        return h("div", {
          "ref": "right",
          "class": bem('right'),
          "on": {
            "click": this.getClickHandler('right', true)
          }
        }, [content]);
      }
    }
  },
  render: function render(test) {
    // console.log(this.iPoint);
    // if (this.iPoint.length > 0) {
    //   if (this.offset > this.iPoint[0]) {
    // console.log(this.offset)
    // }
    // }
    // console.log(test)
    // console.log(arguments)
    // if (test === arguments[0]) {
    //   console.log("true")
    // }

    // arguments是传入的参数的数组
    var h = arguments[0];
    var wrapperStyle = {
      transform: "translate3d(" + this.offset + "px, 0, 0)",
      transitionDuration: this.dragging ? '0s' : '.6s'
    };
    // console.log(this.iPoint);
    return h("div", {
      "class": bem(),
      "on": {
        "click": this.getClickHandler('cell')
      }
    }, [h("div", {
      "class": bem('wrapper'),
      "style": wrapperStyle
    }, [this.genLeftPart(), this.slots(), this.genRightPart()])]);
  }
});
