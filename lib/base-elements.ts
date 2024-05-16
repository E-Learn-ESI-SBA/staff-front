export default class LdrsBaseElement extends HTMLElement {
  _propsToUpgrade: object = {};
  shadow: ShadowRoot;
  template: HTMLTemplateElement;
  defaultProps: Object = {};
  isAttached: boolean = false;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    this.template = document.createElement("template");
  }

  storePropsToUpgrade(props: string[]): void {
    props.forEach((prop) => {
      // @ts-ignore
      if (this.hasOwnProperty(prop) && typeof this[prop] !== "undefined") {
        // @ts-ignore
        this._propsToUpgrade[prop] = this[prop];
        // @ts-ignore
        delete this[prop];
      }
    });
  }

  upgradeStoredProps(): void {
    Object.entries(this._propsToUpgrade).forEach(([key, val]) => {
      this.setAttribute(key, val);
    });
  }

  reflect(props: string[]): void {
    props.forEach((prop) => {
      Object.defineProperty(this, prop, {
        set(val) {
          if ("string,number".includes(typeof val)) {
            this.setAttribute(prop, val.toString());
          } else {
            this.removeAttribute(prop);
          }
        },
        get() {
          return this.getAttribute(prop);
        },
      });
    });
  }

  applyDefaultProps(props: object): void {
    this.defaultProps = props;

    Object.entries(props).forEach(([key, defaultValue]) => {
      // @ts-ignore
      this[key] = this[key] || defaultValue.toString();
    });
  }
}
