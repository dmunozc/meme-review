class StaticPagesController < ApplicationController
  def home
    @memes = Meme.paginate(page: params[:page])
  end
end
