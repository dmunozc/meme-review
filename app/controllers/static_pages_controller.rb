class StaticPagesController < ApplicationController
  def home
    @memes = Meme.paginate(page: params[:page])
  end
  def pagination
    #memes = Meme.paginate(page: params[:page])
    #render partial: 'shared/meme', layout: false, collection: memes
  end
end
