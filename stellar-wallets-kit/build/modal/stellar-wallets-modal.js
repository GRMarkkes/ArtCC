var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { customElement, property } from 'lit/decorators.js';
import { backdropStyles, modalWalletsSection, modalDialogBodyStyles, modalDialogStyles, modalHelpSection, modalAnimations, } from './styles';
let StellarWalletsModal = class StellarWalletsModal extends LitElement {
    constructor() {
        super(...arguments);
        this.showModal = false;
        this.closingModal = false;
        this.modalTitle = 'Connect a Wallet';
        this.notAvailableText = 'Not available';
        this.allowedWallets = [];
        this.modalDialogStyles = { zIndex: 990 };
    }
    connectedCallback() {
        super.connectedCallback();
    }
    async closeModal() {
        this.closingModal = true;
        await new Promise(r => setTimeout(r, 300));
        this.showModal = false;
        this.dispatchEvent(new CustomEvent('modal-closed', {
            detail: new Error('Modal closed'),
            bubbles: true,
            composed: true,
        }));
    }
    async pickWalletOption(option) {
        if (!option.isAvailable) {
            window.open(option.url, '_blank');
            return;
        }
        this.closingModal = true;
        await new Promise(r => setTimeout(r, 300));
        this.dispatchEvent(new CustomEvent('wallet-selected', {
            detail: option,
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        const helpSection = html `
      <section class="help-container">
        <header class="help-header">
          <h2 class="help-header__modal-title dialog-text-solid">Learn more</h2>
        </header>

        <div class="help__whats_a_wallet">
          <h2 class="dialog-text-solid help__title">What is a wallet?</h2>
          <p class="dialog-text help__text">
            Wallets are used to send, receive, and store the keys you use to sign blockchain transactions.
          </p>
        </div>

        <div class="help__whats_stellar">
          <h2 class="dialog-text-solid help__title">What is Stellar?</h2>
          <p class="dialog-text help__text">
            Stellar is a decentralized, public blockchain that gives developers the tools to create experiences that are
            more like cash than crypto
          </p>
        </div>
      </section>
    `;
        const walletsSection = html `
      <section class="wallets-container">
        <header class="wallets-header">
          <h2 class="wallets-header__modal-title dialog-text-solid">${this.modalTitle}</h2>

          <button @click=${() => this.closeModal()} class="wallets-header__button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="20px" width="20px" viewBox="0 0 490 490">
              <polygon
                points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490   489.292,457.678 277.331,245.004 489.292,32.337 " />
            </svg>
          </button>
        </header>

        <ul class="wallets-body">
          ${this.allowedWallets.map((item, i) => html `
                <li
                  @click=${() => this.pickWalletOption(item)}
                  class=" wallets-body__item ${!item.isAvailable ? 'not-available' : ''} ${i ===
            this.allowedWallets.length - 1
            ? 'mb-0'
            : ''}">
                  <img src=${item.icon} alt=${item.name} />
                  <span class="dialog-text-solid">${item.name}</span>
                  ${!item.isAvailable ? html `<small class="not-available">${this.notAvailableText}</small>` : ''}
                </li>
              `)}
        </ul>
      </section>
    `;
        return html `
      <dialog
        style=${styleMap(this.modalDialogStyles)}
        class="dialog-modal ${this.closingModal ? 'closing' : ''}"
        .open=${this.showModal}>
        <section class="dialog-modal-body">
          <div class="dialog-modal-body__help">${helpSection}</div>
          <div class="dialog-modal-body__wallets">${walletsSection}</div>
        </section>
      </dialog>

      <div
        style="position: fixed; z-index: 950"
        class="backdrop ${this.closingModal ? 'closing' : ''}"
        @click=${() => this.closeModal()}></div>
    `;
    }
};
StellarWalletsModal.styles = [
    css `
      :host * {
        box-sizing: border-box;
      }

      .mb-0 {
        margin-bottom: 0 !important;
      }
    `,
    modalDialogStyles,
    modalDialogBodyStyles,
    modalHelpSection,
    backdropStyles,
    modalAnimations,
    modalWalletsSection,
];
__decorate([
    property({ type: Boolean, reflect: true })
], StellarWalletsModal.prototype, "showModal", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], StellarWalletsModal.prototype, "closingModal", void 0);
__decorate([
    property({ type: String, reflect: true })
], StellarWalletsModal.prototype, "modalTitle", void 0);
__decorate([
    property({ type: String, reflect: true })
], StellarWalletsModal.prototype, "notAvailableText", void 0);
__decorate([
    property({
        type: Array,
        reflect: true,
        converter: { fromAttribute: (v) => JSON.parse(v) },
    })
], StellarWalletsModal.prototype, "allowedWallets", void 0);
__decorate([
    property({
        converter: {
            fromAttribute: (v) => v && { ...JSON.parse(v), zIndex: 990 },
        },
    })
], StellarWalletsModal.prototype, "modalDialogStyles", void 0);
StellarWalletsModal = __decorate([
    customElement('stellar-wallets-modal')
], StellarWalletsModal);
export { StellarWalletsModal };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlbGxhci13YWxsZXRzLW1vZGFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGFsL3N0ZWxsYXItd2FsbGV0cy1tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDNUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFHNUQsT0FBTyxFQUNMLGNBQWMsRUFDZCxtQkFBbUIsRUFDbkIscUJBQXFCLEVBQ3JCLGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsZUFBZSxHQUNoQixNQUFNLFVBQVUsQ0FBQztBQUdsQixJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFvQixTQUFRLFVBQVU7SUFBbkQ7O1FBb0JFLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFHM0IsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFHOUIsZUFBVSxHQUFXLGtCQUFrQixDQUFDO1FBR3hDLHFCQUFnQixHQUFXLGVBQWUsQ0FBQztRQU8zQyxtQkFBYyxHQUF1QixFQUFFLENBQUM7UUFPeEMsc0JBQWlCLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFtSHRDLENBQUM7SUFqSFUsaUJBQWlCO1FBQ3hCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVTtRQUNkLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBRXpCLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFFdkIsSUFB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RUFBRSxDQUFDO3lEQUNiO0FBRzlCO0lBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7dURBQ0Y7QUFHeEM7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs2REFDQztBQU8zQztJQUxDLFFBQVEsQ0FBQztRQUNSLElBQUksRUFBRSxLQUFLO1FBQ1gsT0FBTyxFQUFFLElBQUk7UUFDYixTQUFTLEVBQUUsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7S0FDM0QsQ0FBQzsyREFDc0M7QUFPeEM7SUFMQyxRQUFRLENBQUM7UUFDUixTQUFTLEVBQUU7WUFDVCxhQUFhLEVBQUUsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO1NBQ3JFO0tBQ0YsQ0FBQzs4REFDa0M7QUEzQ3pCLG1CQUFtQjtJQUQvQixhQUFhLENBQUMsdUJBQXVCLENBQUM7R0FDMUIsbUJBQW1CLENBOEovQjtTQTlKWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXRFbGVtZW50LCBodG1sLCBjc3MgfSBmcm9tICdsaXQnO1xuaW1wb3J0IHsgc3R5bGVNYXAgfSBmcm9tICdsaXQvZGlyZWN0aXZlcy9zdHlsZS1tYXAuanMnO1xuaW1wb3J0IHsgY3VzdG9tRWxlbWVudCwgcHJvcGVydHkgfSBmcm9tICdsaXQvZGVjb3JhdG9ycy5qcyc7XG5cbmltcG9ydCB7IElTdXBwb3J0ZWRXYWxsZXQgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQge1xuICBiYWNrZHJvcFN0eWxlcyxcbiAgbW9kYWxXYWxsZXRzU2VjdGlvbixcbiAgbW9kYWxEaWFsb2dCb2R5U3R5bGVzLFxuICBtb2RhbERpYWxvZ1N0eWxlcyxcbiAgbW9kYWxIZWxwU2VjdGlvbixcbiAgbW9kYWxBbmltYXRpb25zLFxufSBmcm9tICcuL3N0eWxlcyc7XG5cbkBjdXN0b21FbGVtZW50KCdzdGVsbGFyLXdhbGxldHMtbW9kYWwnKVxuZXhwb3J0IGNsYXNzIFN0ZWxsYXJXYWxsZXRzTW9kYWwgZXh0ZW5kcyBMaXRFbGVtZW50IHtcbiAgc3RhdGljIG92ZXJyaWRlIHN0eWxlcyA9IFtcbiAgICBjc3NgXG4gICAgICA6aG9zdCAqIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgIH1cblxuICAgICAgLm1iLTAge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwICFpbXBvcnRhbnQ7XG4gICAgICB9XG4gICAgYCxcbiAgICBtb2RhbERpYWxvZ1N0eWxlcyxcbiAgICBtb2RhbERpYWxvZ0JvZHlTdHlsZXMsXG4gICAgbW9kYWxIZWxwU2VjdGlvbixcbiAgICBiYWNrZHJvcFN0eWxlcyxcbiAgICBtb2RhbEFuaW1hdGlvbnMsXG4gICAgbW9kYWxXYWxsZXRzU2VjdGlvbixcbiAgXTtcblxuICBAcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuLCByZWZsZWN0OiB0cnVlIH0pXG4gIHNob3dNb2RhbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IEJvb2xlYW4sIHJlZmxlY3Q6IHRydWUgfSlcbiAgY2xvc2luZ01vZGFsOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogU3RyaW5nLCByZWZsZWN0OiB0cnVlIH0pXG4gIG1vZGFsVGl0bGU6IHN0cmluZyA9ICdDb25uZWN0IGEgV2FsbGV0JztcblxuICBAcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcsIHJlZmxlY3Q6IHRydWUgfSlcbiAgbm90QXZhaWxhYmxlVGV4dDogc3RyaW5nID0gJ05vdCBhdmFpbGFibGUnO1xuXG4gIEBwcm9wZXJ0eSh7XG4gICAgdHlwZTogQXJyYXksXG4gICAgcmVmbGVjdDogdHJ1ZSxcbiAgICBjb252ZXJ0ZXI6IHsgZnJvbUF0dHJpYnV0ZTogKHY6IHN0cmluZykgPT4gSlNPTi5wYXJzZSh2KSB9LFxuICB9KVxuICBhbGxvd2VkV2FsbGV0czogSVN1cHBvcnRlZFdhbGxldFtdID0gW107XG5cbiAgQHByb3BlcnR5KHtcbiAgICBjb252ZXJ0ZXI6IHtcbiAgICAgIGZyb21BdHRyaWJ1dGU6ICh2OiBzdHJpbmcpID0+IHYgJiYgeyAuLi5KU09OLnBhcnNlKHYpLCB6SW5kZXg6IDk5MCB9LFxuICAgIH0sXG4gIH0pXG4gIG1vZGFsRGlhbG9nU3R5bGVzID0geyB6SW5kZXg6IDk5MCB9O1xuXG4gIG92ZXJyaWRlIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHN1cGVyLmNvbm5lY3RlZENhbGxiYWNrKCk7XG4gIH1cblxuICBhc3luYyBjbG9zZU1vZGFsKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuY2xvc2luZ01vZGFsID0gdHJ1ZTtcblxuICAgIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCAzMDApKTtcblxuICAgIHRoaXMuc2hvd01vZGFsID0gZmFsc2U7XG5cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICBuZXcgQ3VzdG9tRXZlbnQoJ21vZGFsLWNsb3NlZCcsIHtcbiAgICAgICAgZGV0YWlsOiBuZXcgRXJyb3IoJ01vZGFsIGNsb3NlZCcpLFxuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGFzeW5jIHBpY2tXYWxsZXRPcHRpb24ob3B0aW9uOiBJU3VwcG9ydGVkV2FsbGV0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFvcHRpb24uaXNBdmFpbGFibGUpIHtcbiAgICAgIHdpbmRvdy5vcGVuKG9wdGlvbi51cmwsICdfYmxhbmsnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNsb3NpbmdNb2RhbCA9IHRydWU7XG5cbiAgICBhd2FpdCBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgMzAwKSk7XG5cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3dhbGxldC1zZWxlY3RlZCcsIHtcbiAgICAgICAgZGV0YWlsOiBvcHRpb24sXG4gICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgb3ZlcnJpZGUgcmVuZGVyKCkge1xuICAgIGNvbnN0IGhlbHBTZWN0aW9uID0gaHRtbGBcbiAgICAgIDxzZWN0aW9uIGNsYXNzPVwiaGVscC1jb250YWluZXJcIj5cbiAgICAgICAgPGhlYWRlciBjbGFzcz1cImhlbHAtaGVhZGVyXCI+XG4gICAgICAgICAgPGgyIGNsYXNzPVwiaGVscC1oZWFkZXJfX21vZGFsLXRpdGxlIGRpYWxvZy10ZXh0LXNvbGlkXCI+TGVhcm4gbW9yZTwvaDI+XG4gICAgICAgIDwvaGVhZGVyPlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJoZWxwX193aGF0c19hX3dhbGxldFwiPlxuICAgICAgICAgIDxoMiBjbGFzcz1cImRpYWxvZy10ZXh0LXNvbGlkIGhlbHBfX3RpdGxlXCI+V2hhdCBpcyBhIHdhbGxldD88L2gyPlxuICAgICAgICAgIDxwIGNsYXNzPVwiZGlhbG9nLXRleHQgaGVscF9fdGV4dFwiPlxuICAgICAgICAgICAgV2FsbGV0cyBhcmUgdXNlZCB0byBzZW5kLCByZWNlaXZlLCBhbmQgc3RvcmUgdGhlIGtleXMgeW91IHVzZSB0byBzaWduIGJsb2NrY2hhaW4gdHJhbnNhY3Rpb25zLlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImhlbHBfX3doYXRzX3N0ZWxsYXJcIj5cbiAgICAgICAgICA8aDIgY2xhc3M9XCJkaWFsb2ctdGV4dC1zb2xpZCBoZWxwX190aXRsZVwiPldoYXQgaXMgU3RlbGxhcj88L2gyPlxuICAgICAgICAgIDxwIGNsYXNzPVwiZGlhbG9nLXRleHQgaGVscF9fdGV4dFwiPlxuICAgICAgICAgICAgU3RlbGxhciBpcyBhIGRlY2VudHJhbGl6ZWQsIHB1YmxpYyBibG9ja2NoYWluIHRoYXQgZ2l2ZXMgZGV2ZWxvcGVycyB0aGUgdG9vbHMgdG8gY3JlYXRlIGV4cGVyaWVuY2VzIHRoYXQgYXJlXG4gICAgICAgICAgICBtb3JlIGxpa2UgY2FzaCB0aGFuIGNyeXB0b1xuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgYDtcblxuICAgIGNvbnN0IHdhbGxldHNTZWN0aW9uID0gaHRtbGBcbiAgICAgIDxzZWN0aW9uIGNsYXNzPVwid2FsbGV0cy1jb250YWluZXJcIj5cbiAgICAgICAgPGhlYWRlciBjbGFzcz1cIndhbGxldHMtaGVhZGVyXCI+XG4gICAgICAgICAgPGgyIGNsYXNzPVwid2FsbGV0cy1oZWFkZXJfX21vZGFsLXRpdGxlIGRpYWxvZy10ZXh0LXNvbGlkXCI+JHt0aGlzLm1vZGFsVGl0bGV9PC9oMj5cblxuICAgICAgICAgIDxidXR0b24gQGNsaWNrPSR7KCkgPT4gdGhpcy5jbG9zZU1vZGFsKCl9IGNsYXNzPVwid2FsbGV0cy1oZWFkZXJfX2J1dHRvblwiPlxuICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIiMwMDAwMDBcIiBoZWlnaHQ9XCIyMHB4XCIgd2lkdGg9XCIyMHB4XCIgdmlld0JveD1cIjAgMCA0OTAgNDkwXCI+XG4gICAgICAgICAgICAgIDxwb2x5Z29uXG4gICAgICAgICAgICAgICAgcG9pbnRzPVwiNDU2Ljg1MSwwIDI0NSwyMTIuNTY0IDMzLjE0OSwwIDAuNzA4LDMyLjMzNyAyMTIuNjY5LDI0NS4wMDQgMC43MDgsNDU3LjY3OCAzMy4xNDksNDkwIDI0NSwyNzcuNDQzIDQ1Ni44NTEsNDkwICAgNDg5LjI5Miw0NTcuNjc4IDI3Ny4zMzEsMjQ1LjAwNCA0ODkuMjkyLDMyLjMzNyBcIiAvPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvaGVhZGVyPlxuXG4gICAgICAgIDx1bCBjbGFzcz1cIndhbGxldHMtYm9keVwiPlxuICAgICAgICAgICR7dGhpcy5hbGxvd2VkV2FsbGV0cy5tYXAoXG4gICAgICAgICAgICAoaXRlbTogSVN1cHBvcnRlZFdhbGxldCwgaTogbnVtYmVyKSA9PlxuICAgICAgICAgICAgICBodG1sYFxuICAgICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICAgQGNsaWNrPSR7KCkgPT4gdGhpcy5waWNrV2FsbGV0T3B0aW9uKGl0ZW0pfVxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCIgd2FsbGV0cy1ib2R5X19pdGVtICR7IWl0ZW0uaXNBdmFpbGFibGUgPyAnbm90LWF2YWlsYWJsZScgOiAnJ30gJHtpID09PVxuICAgICAgICAgICAgICAgICAgdGhpcy5hbGxvd2VkV2FsbGV0cy5sZW5ndGggLSAxXG4gICAgICAgICAgICAgICAgICAgID8gJ21iLTAnXG4gICAgICAgICAgICAgICAgICAgIDogJyd9XCI+XG4gICAgICAgICAgICAgICAgICA8aW1nIHNyYz0ke2l0ZW0uaWNvbn0gYWx0PSR7aXRlbS5uYW1lfSAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkaWFsb2ctdGV4dC1zb2xpZFwiPiR7aXRlbS5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICR7IWl0ZW0uaXNBdmFpbGFibGUgPyBodG1sYDxzbWFsbCBjbGFzcz1cIm5vdC1hdmFpbGFibGVcIj4ke3RoaXMubm90QXZhaWxhYmxlVGV4dH08L3NtYWxsPmAgOiAnJ31cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICBgXG4gICAgICAgICAgKX1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICBgO1xuXG4gICAgcmV0dXJuIGh0bWxgXG4gICAgICA8ZGlhbG9nXG4gICAgICAgIHN0eWxlPSR7c3R5bGVNYXAodGhpcy5tb2RhbERpYWxvZ1N0eWxlcyl9XG4gICAgICAgIGNsYXNzPVwiZGlhbG9nLW1vZGFsICR7dGhpcy5jbG9zaW5nTW9kYWwgPyAnY2xvc2luZycgOiAnJ31cIlxuICAgICAgICAub3Blbj0ke3RoaXMuc2hvd01vZGFsfT5cbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJkaWFsb2ctbW9kYWwtYm9keVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaWFsb2ctbW9kYWwtYm9keV9faGVscFwiPiR7aGVscFNlY3Rpb259PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRpYWxvZy1tb2RhbC1ib2R5X193YWxsZXRzXCI+JHt3YWxsZXRzU2VjdGlvbn08L2Rpdj5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgPC9kaWFsb2c+XG5cbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9XCJwb3NpdGlvbjogZml4ZWQ7IHotaW5kZXg6IDk1MFwiXG4gICAgICAgIGNsYXNzPVwiYmFja2Ryb3AgJHt0aGlzLmNsb3NpbmdNb2RhbCA/ICdjbG9zaW5nJyA6ICcnfVwiXG4gICAgICAgIEBjbGljaz0keygpID0+IHRoaXMuY2xvc2VNb2RhbCgpfT48L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIEhUTUxFbGVtZW50VGFnTmFtZU1hcCB7XG4gICAgJ3N0ZWxsYXItd2FsbGV0cy1tb2RhbCc6IFN0ZWxsYXJXYWxsZXRzTW9kYWw7XG4gIH1cbn1cbiJdfQ==