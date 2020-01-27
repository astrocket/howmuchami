module Api
  class LikesController < Api::ApiController
    before_action :set_like

    def show
      render json: {
          count: @like.count
      }
    end

    def up
      @like.increment!(:count)

      render json: {
          count: @like.count
      }
    end

    private

    def set_like
      @like = Like.where(name: params[:name]).first
      raise Exceptions::DefaultError, "없는 Like 입니다." if @like.nil?
    end
  end
end