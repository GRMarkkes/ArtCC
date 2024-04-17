import { css } from 'lit';
export const modalDialogStyles = css `
  .dialog-modal {
    position: fixed;
    z-index: 99;
    font-family: 'Open Sans', arial, sans-serif;
    margin: 0 auto;
    padding: 0;
    width: 100%;
    border-radius: 1rem 1rem 0 0;
    border-width: 0;
    box-shadow: 0 0.125rem 0.75rem rgba(0, 0, 0, 0.25);
    bottom: 0;
    overflow: hidden;
  }

  @media screen and (min-width: 768px) {
    .dialog-modal {
      z-index: 990;
      bottom: auto;
      top: 5rem;
      max-width: 45rem;
      border-radius: 1rem;
    }
  }
`;
export const modalDialogBodyStyles = css `
  .dialog-modal-body {
    display: flex;
    flex-direction: column-reverse;
  }

  .dialog-modal-body__help,
  .dialog-modal-body__wallets {
    width: 100%;
    flex-basis: 100%;
  }

  .dialog-modal-body__help {
    padding: 1.5rem;
  }

  .dialog-modal-body__wallets {
    padding: 1.5rem;
  }

  .dialog-text-solid {
    font-size: 1rem;
    line-height: 1.25rem;
  }

  .dialog-text {
    font-size: 0.875rem;
    line-height: 1.125rem;
  }

  @media (prefers-color-scheme: light) {
    .dialog-modal-body__help {
      background-color: #f8f8f8;
      border-top: 1px solid rgba(0, 0, 0, 0.15);
    }

    @media screen and (min-width: 768px) {
      .dialog-modal-body__help {
        border-top: none;
        border-right: 1px solid rgba(0, 0, 0, 0.15);
      }
    }

    .dialog-modal-body__wallets,
    .dialog-modal-body {
      background-color: #fcfcfc;
    }

    .dialog-text-solid {
      color: #000000;
    }

    .dialog-text {
      color: #181818;
    }
  }

  @media (prefers-color-scheme: dark) {
    .dialog-modal-body__help {
      background-color: #1c1c1c;
      border-top: 1px solid rgba(255, 255, 255, 0.15);
    }

    @media screen and (min-width: 768px) {
      .dialog-modal-body__help {
        border-top: none;
        border-right: 1px solid rgba(255, 255, 255, 0.15);
      }
    }

    .dialog-modal-body__wallets,
    .dialog-modal-body {
      background-color: #161616;
    }

    .dialog-text-solid {
      color: #ededed;
    }

    .dialog-text {
      color: #a0a0a0;
    }
  }

  @media screen and (min-width: 768px) {
    .dialog-modal-body {
      flex-direction: row;
    }

    .dialog-modal-body__help,
    .dialog-modal-body__wallets {
      padding: 2rem;
    }
  }
`;
export const modalHelpSection = css `
  .help-container {
    width: 100%;
  }

  .help-header {
    display: none;
    margin: 0 0 2rem 0;
  }

  .help-header__modal-title {
    font-size: 1.25rem;
    padding: 0;
    margin: 0;
  }

  .help__title,
  .help__text {
    text-align: center;
  }

  .help__title {
    font-weight: 400;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  .help__text {
    max-width: 21rem;
    margin-left: auto;
    margin-right: auto;
    font-weight: 300;
    margin-top: 0;
  }

  .help__whats_stellar {
    display: none;
  }

  @media screen and (min-width: 768px) {
    .help-header {
      display: block;
    }

    .help__title,
    .help__text {
      text-align: left;
      margin-left: 0;
    }

    .help__whats_a_wallet {
      margin-bottom: 2rem;
    }

    .help__whats_stellar {
      display: block;
    }
  }
`;
export const modalWalletsSection = css `
  .wallets-container {
    width: 100%;
    height: 100%;
    min-height: fit-content;
    display: flex;
    flex-direction: column;
  }

  .wallets-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .wallets-header__modal-title {
    font-size: 1.25rem;
    padding: 0;
    margin: 0;
  }

  .wallets-header__button {
    background: none;
    border: none;
    cursor: pointer;
  }

  @media (prefers-color-scheme: light) {
    .wallets-header__button svg {
      fill: #8f8f8f;
    }
  }

  @media (prefers-color-scheme: dark) {
    .wallets-header__button svg {
      fill: #707070;
    }
  }

  .wallets-body {
    margin: 0;
    width: 100%;
    list-style: none;
    padding: 0 !important;
  }

  .wallets-body__item {
    display: flex;
    align-items: center;
    font-weight: 600;
    margin-bottom: 2rem;
    cursor: pointer;
  }

  .wallets-body__item img {
    margin-right: 1rem;
    width: 2rem;
    border-radius: 100%;
    overflow: hidden;
  }

  .wallets-body__item.not-available {
    cursor: alias;
  }

  .wallets-body__item .not-available {
    margin-left: auto;
    font-size: 10px;
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
  }

  @media (prefers-color-scheme: light) {
    .wallets-body__item .not-available {
      border: solid #e2e2e2 1px;
      background-color: #f3f3f3;
      color: #6f6f6f;
    }
  }

  @media (prefers-color-scheme: dark) {
    .wallets-body__item .not-available {
      border: solid #343434 1px;
      background-color: #232323;
      color: #a0a0a0;
    }
  }

  @media screen and (min-width: 768px) {
  }
`;
export const backdropStyles = css `
  .dialog-modal[open] + .backdrop {
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
export const modalAnimations = css `
  .dialog-modal[open] {
    -webkit-animation: showModal 0.3s ease normal;
  }
  @-webkit-keyframes showModal {
    from {
      transform: translateY(25%);
      opacity: 0;
    }
    to {
      transform: translateY(0%);
      opacity: 1;
    }
  }

  .dialog-modal.closing {
    -webkit-animation: hideModal 0.3s ease normal !important;
  }
  @-webkit-keyframes hideModal {
    from {
      transform: translateY(0%);
      opacity: 1;
    }
    to {
      transform: translateY(25%);
      opacity: 0;
    }
  }

  .backdrop.closing {
    -webkit-animation: hideBackdrop 0.3s ease normal !important;
  }
  @-webkit-keyframes hideBackdrop {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGFsL3N0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTFCLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBd0JuQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBOEZ2QyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBMERsQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTRGckMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7O0NBUWhDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBd0NqQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSAnbGl0JztcblxuZXhwb3J0IGNvbnN0IG1vZGFsRGlhbG9nU3R5bGVzID0gY3NzYFxuICAuZGlhbG9nLW1vZGFsIHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgei1pbmRleDogOTk7XG4gICAgZm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnLCBhcmlhbCwgc2Fucy1zZXJpZjtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgICBwYWRkaW5nOiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJvcmRlci1yYWRpdXM6IDFyZW0gMXJlbSAwIDA7XG4gICAgYm9yZGVyLXdpZHRoOiAwO1xuICAgIGJveC1zaGFkb3c6IDAgMC4xMjVyZW0gMC43NXJlbSByZ2JhKDAsIDAsIDAsIDAuMjUpO1xuICAgIGJvdHRvbTogMDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG5cbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICAuZGlhbG9nLW1vZGFsIHtcbiAgICAgIHotaW5kZXg6IDk5MDtcbiAgICAgIGJvdHRvbTogYXV0bztcbiAgICAgIHRvcDogNXJlbTtcbiAgICAgIG1heC13aWR0aDogNDVyZW07XG4gICAgICBib3JkZXItcmFkaXVzOiAxcmVtO1xuICAgIH1cbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IG1vZGFsRGlhbG9nQm9keVN0eWxlcyA9IGNzc2BcbiAgLmRpYWxvZy1tb2RhbC1ib2R5IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4tcmV2ZXJzZTtcbiAgfVxuXG4gIC5kaWFsb2ctbW9kYWwtYm9keV9faGVscCxcbiAgLmRpYWxvZy1tb2RhbC1ib2R5X193YWxsZXRzIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBmbGV4LWJhc2lzOiAxMDAlO1xuICB9XG5cbiAgLmRpYWxvZy1tb2RhbC1ib2R5X19oZWxwIHtcbiAgICBwYWRkaW5nOiAxLjVyZW07XG4gIH1cblxuICAuZGlhbG9nLW1vZGFsLWJvZHlfX3dhbGxldHMge1xuICAgIHBhZGRpbmc6IDEuNXJlbTtcbiAgfVxuXG4gIC5kaWFsb2ctdGV4dC1zb2xpZCB7XG4gICAgZm9udC1zaXplOiAxcmVtO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xuICB9XG5cbiAgLmRpYWxvZy10ZXh0IHtcbiAgICBmb250LXNpemU6IDAuODc1cmVtO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjEyNXJlbTtcbiAgfVxuXG4gIEBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGxpZ2h0KSB7XG4gICAgLmRpYWxvZy1tb2RhbC1ib2R5X19oZWxwIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmOGY4Zjg7XG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjE1KTtcbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xuICAgICAgLmRpYWxvZy1tb2RhbC1ib2R5X19oZWxwIHtcbiAgICAgICAgYm9yZGVyLXRvcDogbm9uZTtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjE1KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAuZGlhbG9nLW1vZGFsLWJvZHlfX3dhbGxldHMsXG4gICAgLmRpYWxvZy1tb2RhbC1ib2R5IHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmY2ZjZmM7XG4gICAgfVxuXG4gICAgLmRpYWxvZy10ZXh0LXNvbGlkIHtcbiAgICAgIGNvbG9yOiAjMDAwMDAwO1xuICAgIH1cblxuICAgIC5kaWFsb2ctdGV4dCB7XG4gICAgICBjb2xvcjogIzE4MTgxODtcbiAgICB9XG4gIH1cblxuICBAbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKSB7XG4gICAgLmRpYWxvZy1tb2RhbC1ib2R5X19oZWxwIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMxYzFjMWM7XG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KTtcbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xuICAgICAgLmRpYWxvZy1tb2RhbC1ib2R5X19oZWxwIHtcbiAgICAgICAgYm9yZGVyLXRvcDogbm9uZTtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAuZGlhbG9nLW1vZGFsLWJvZHlfX3dhbGxldHMsXG4gICAgLmRpYWxvZy1tb2RhbC1ib2R5IHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMxNjE2MTY7XG4gICAgfVxuXG4gICAgLmRpYWxvZy10ZXh0LXNvbGlkIHtcbiAgICAgIGNvbG9yOiAjZWRlZGVkO1xuICAgIH1cblxuICAgIC5kaWFsb2ctdGV4dCB7XG4gICAgICBjb2xvcjogI2EwYTBhMDtcbiAgICB9XG4gIH1cblxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xuICAgIC5kaWFsb2ctbW9kYWwtYm9keSB7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIH1cblxuICAgIC5kaWFsb2ctbW9kYWwtYm9keV9faGVscCxcbiAgICAuZGlhbG9nLW1vZGFsLWJvZHlfX3dhbGxldHMge1xuICAgICAgcGFkZGluZzogMnJlbTtcbiAgICB9XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBtb2RhbEhlbHBTZWN0aW9uID0gY3NzYFxuICAuaGVscC1jb250YWluZXIge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgLmhlbHAtaGVhZGVyIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICAgIG1hcmdpbjogMCAwIDJyZW0gMDtcbiAgfVxuXG4gIC5oZWxwLWhlYWRlcl9fbW9kYWwtdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMS4yNXJlbTtcbiAgICBwYWRkaW5nOiAwO1xuICAgIG1hcmdpbjogMDtcbiAgfVxuXG4gIC5oZWxwX190aXRsZSxcbiAgLmhlbHBfX3RleHQge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxuXG4gIC5oZWxwX190aXRsZSB7XG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICBtYXJnaW4tdG9wOiAwO1xuICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbiAgfVxuXG4gIC5oZWxwX190ZXh0IHtcbiAgICBtYXgtd2lkdGg6IDIxcmVtO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICBmb250LXdlaWdodDogMzAwO1xuICAgIG1hcmdpbi10b3A6IDA7XG4gIH1cblxuICAuaGVscF9fd2hhdHNfc3RlbGxhciB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgLmhlbHAtaGVhZGVyIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIH1cblxuICAgIC5oZWxwX190aXRsZSxcbiAgICAuaGVscF9fdGV4dCB7XG4gICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgfVxuXG4gICAgLmhlbHBfX3doYXRzX2Ffd2FsbGV0IHtcbiAgICAgIG1hcmdpbi1ib3R0b206IDJyZW07XG4gICAgfVxuXG4gICAgLmhlbHBfX3doYXRzX3N0ZWxsYXIge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgbW9kYWxXYWxsZXRzU2VjdGlvbiA9IGNzc2BcbiAgLndhbGxldHMtY29udGFpbmVyIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgbWluLWhlaWdodDogZml0LWNvbnRlbnQ7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB9XG5cbiAgLndhbGxldHMtaGVhZGVyIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcbiAgfVxuXG4gIC53YWxsZXRzLWhlYWRlcl9fbW9kYWwtdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMS4yNXJlbTtcbiAgICBwYWRkaW5nOiAwO1xuICAgIG1hcmdpbjogMDtcbiAgfVxuXG4gIC53YWxsZXRzLWhlYWRlcl9fYnV0dG9uIHtcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gIH1cblxuICBAbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBsaWdodCkge1xuICAgIC53YWxsZXRzLWhlYWRlcl9fYnV0dG9uIHN2ZyB7XG4gICAgICBmaWxsOiAjOGY4ZjhmO1xuICAgIH1cbiAgfVxuXG4gIEBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspIHtcbiAgICAud2FsbGV0cy1oZWFkZXJfX2J1dHRvbiBzdmcge1xuICAgICAgZmlsbDogIzcwNzA3MDtcbiAgICB9XG4gIH1cblxuICAud2FsbGV0cy1ib2R5IHtcbiAgICBtYXJnaW46IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICBwYWRkaW5nOiAwICFpbXBvcnRhbnQ7XG4gIH1cblxuICAud2FsbGV0cy1ib2R5X19pdGVtIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuXG4gIC53YWxsZXRzLWJvZHlfX2l0ZW0gaW1nIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDFyZW07XG4gICAgd2lkdGg6IDJyZW07XG4gICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG5cbiAgLndhbGxldHMtYm9keV9faXRlbS5ub3QtYXZhaWxhYmxlIHtcbiAgICBjdXJzb3I6IGFsaWFzO1xuICB9XG5cbiAgLndhbGxldHMtYm9keV9faXRlbSAubm90LWF2YWlsYWJsZSB7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgZm9udC1zaXplOiAxMHB4O1xuICAgIHBhZGRpbmc6IDAuMjVyZW0gMC41cmVtO1xuICAgIGJvcmRlci1yYWRpdXM6IDFyZW07XG4gIH1cblxuICBAbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBsaWdodCkge1xuICAgIC53YWxsZXRzLWJvZHlfX2l0ZW0gLm5vdC1hdmFpbGFibGUge1xuICAgICAgYm9yZGVyOiBzb2xpZCAjZTJlMmUyIDFweDtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmM2YzZjM7XG4gICAgICBjb2xvcjogIzZmNmY2ZjtcbiAgICB9XG4gIH1cblxuICBAbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKSB7XG4gICAgLndhbGxldHMtYm9keV9faXRlbSAubm90LWF2YWlsYWJsZSB7XG4gICAgICBib3JkZXI6IHNvbGlkICMzNDM0MzQgMXB4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzIzMjMyMztcbiAgICAgIGNvbG9yOiAjYTBhMGEwO1xuICAgIH1cbiAgfVxuXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBiYWNrZHJvcFN0eWxlcyA9IGNzc2BcbiAgLmRpYWxvZy1tb2RhbFtvcGVuXSArIC5iYWNrZHJvcCB7XG4gICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjUpO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IG1vZGFsQW5pbWF0aW9ucyA9IGNzc2BcbiAgLmRpYWxvZy1tb2RhbFtvcGVuXSB7XG4gICAgLXdlYmtpdC1hbmltYXRpb246IHNob3dNb2RhbCAwLjNzIGVhc2Ugbm9ybWFsO1xuICB9XG4gIEAtd2Via2l0LWtleWZyYW1lcyBzaG93TW9kYWwge1xuICAgIGZyb20ge1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDI1JSk7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgIH1cbiAgICB0byB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpO1xuICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG4gIH1cblxuICAuZGlhbG9nLW1vZGFsLmNsb3Npbmcge1xuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBoaWRlTW9kYWwgMC4zcyBlYXNlIG5vcm1hbCAhaW1wb3J0YW50O1xuICB9XG4gIEAtd2Via2l0LWtleWZyYW1lcyBoaWRlTW9kYWwge1xuICAgIGZyb20ge1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAlKTtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuICAgIHRvIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyNSUpO1xuICAgICAgb3BhY2l0eTogMDtcbiAgICB9XG4gIH1cblxuICAuYmFja2Ryb3AuY2xvc2luZyB7XG4gICAgLXdlYmtpdC1hbmltYXRpb246IGhpZGVCYWNrZHJvcCAwLjNzIGVhc2Ugbm9ybWFsICFpbXBvcnRhbnQ7XG4gIH1cbiAgQC13ZWJraXQta2V5ZnJhbWVzIGhpZGVCYWNrZHJvcCB7XG4gICAgZnJvbSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbiAgICB0byB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgIH1cbiAgfVxuYDtcbiJdfQ==