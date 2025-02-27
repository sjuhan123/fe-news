import { Header } from "./components/Header/Header.js";
import { TrendNews } from "./components/TrendNews/TrendNews.js";
import { MainView } from "./components/MainView/MainView.js";
import { Component } from "./core/Component.js";
import { getDataBy } from "./api/api.js";
import { suffleData } from "./utils/index.js";
import { URLS } from "./constants/index.js";

export class App extends Component {
  template() {
    return `
      <div class="newsstand-header"></div>
      <div class="newsstand-trendnews"></div>
      <div class="newsstand-main"></div>
    `;
  }

  async mounted() {
    const header = this.target.querySelector(".newsstand-header");
    const trendNews = this.target.querySelector(".newsstand-trendnews");

    new Header(header);
    new TrendNews(trendNews);

    const mainView = this.target.querySelector(".newsstand-main");

    const [pressData, pressCategories] = await Promise.all([
      getDataBy(URLS.PRESSES_DATA),
      getDataBy(URLS.PRESSES_CATEGORIES),
    ]);
    const suffledPressData = suffleData(pressData);

    new MainView(mainView, {
      allPressData: suffledPressData,
      // 빈배열을 props로 주는게 맞는 선택일까?
      subscribedPressSrcs: [],
      pressCategories,
    });
  }
}
