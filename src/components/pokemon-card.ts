import { LitElement, html, css, } from "lit";
import {customElement, property, state} from 'lit/decorators.js';

export interface Pokemon {
  name: String,
  image?: String,
  attacks: { fast: any[], special: any[] }
}

@customElement("pokemon-card")
class PokemonCard extends LitElement {
  static styles = css`
    .title {
      display: flex;
      justify-content: space-between;
    }
    .no-margin-tb {
      margin-top: 0px;
      margin-bottom: 0px;
    }
    .img-container {
      height: 150px;
      width: 100px;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    img {
      max-width: 100%;
      max-height: 100%;
    }
    .attacks {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
    }
    .card-container {
      display: flex;
      flex-direction: row;
    }
    .card {
      background: white;
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 4px 4px 12px 2px rgba(0, 0, 0, 0.75);
      height: 400px;
      width: 200px;
      transition: 0.2s;
      margin-right: -10rem;
    }
    // .card.active {
    //   transform: translateY(-5rem);
    // }
    // .card.active ~ .card {
    //   transform: translateX(20rem);
    // }
    .card:hover {
      transform: translateY(-5rem);
    }
    .card:hover ~ .card {
      transform: translateX(20rem);
    }
    .card:hover {
      cursor: pointer;
    }
  `;

  @property({type: Array})
  items = [];

  @state()
  private _cursor:number = 0;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("keydown", this.rightHandler);
    window.addEventListener("keydown", this.leftHandler);
  }

  rightHandler(event: KeyboardEvent) {
    if (event.key === "ArrowRight") {
      this._cursor++;
    }
  }

  leftHandler(event: KeyboardEvent) {
    if (event.key === "ArrowLeft") {
      this._cursor--;
    }
  }

  setPokemonCards() {  

    return this.items.map(
      (item: Pokemon, i) =>
        html`
        <div class="card ${i === this._cursor ? "active" : ""}">
        <div class="title">
          <h2>${item.name}</h2>
          <h2>#${i}</h2>
        </div>
        <div class="img-container">
          <img src=${item.image} />
        </div>
        <h3 class="no-margin-tb">Fast attacks 🌪</h3>
        <div class="attacks">${this.setFastAttacks(item)}</div>
        <h3 class="no-margin-tb">Special attacks 🔥</h3>
        <div class="attacks">${this.setSpecialAttacks(item)}</div>
      </div>
        `
    );
  }

  setFastAttacks(item: Pokemon ) {
    return item.attacks.fast
      ? item.attacks.fast.map((item) => html`<p>${item.name}</p>`)
      : "";
  }

  setSpecialAttacks(item : Pokemon) {
    return item.attacks.special
      ? item.attacks.special.map((item) => html`<p>${item.name}</p>`)
      : "";
  }

  render() {
    return html` <div class="card-container">${this.setPokemonCards()}</div> `;
  }
}