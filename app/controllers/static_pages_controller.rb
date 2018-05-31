class StaticPagesController < ApplicationController
  def home
    @memes = Meme.paginate(page: 1)
    @endpoint = pagination_path
    @page_amount = @memes.total_pages
  end
  def pagination
    memes = Meme.paginate(page: params[:page])
    render partial: 'shared/meme', layout: false, collection: memes
  end
end
