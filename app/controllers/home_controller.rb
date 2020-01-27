class HomeController < ApplicationController
  before_action :set_like

  def index
  end

  def like
    @like.increment!(:count)

    render json: {
        count: @like.count
    }
  end

  private

  def set_like
    @like = Like.where(name: "calculator").first_or_create!
  end
end
