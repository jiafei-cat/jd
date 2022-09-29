import request from '../utils/request'

interface IArticleItem {
  item_type: number
  item_info: {
    /** 文章id */
    article_id: string
  }
}

class ViewArticle {
  private articleList: IArticleItem[] = []

  async init() {
    // await this.getArticleList()
  }

  async getArticleList () {
    const result = await request.post<never, baseAPIData<IArticleItem[]>>('https://api.juejin.cn/recommend_api/v1/article/recommend_all_feed?spider=0')

    if (!!result.err_no) {
      console.log('获取掘金文章列表失败!')
      return
    }

    this.articleList = result.data.filter(i => i.item_type === 2)

    console.log('xxxxx')
    console.log(result)
  }

  async viewArticle () {
    // const result = await request.get()
  }
}

export default new ViewArticle()