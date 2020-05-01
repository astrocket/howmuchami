Rails.application.routes.draw do
  namespace :api do
    get '/home/index' => 'home#index'
    resources :likes, param: :name, format: :json do
      member do
        post :up
      end
    end
  end
  
  scope :app do
    get '/' => 'home#index'

    devise_for :admin_users, ActiveAdmin::Devise.config
    ActiveAdmin.routes(self)
    # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  end

  # To render react packs for any path except app/api 
  scope '/:path', constraints: { path: /(?!app|api).+/ } do
    get '/' => 'react#index', as: :react # react_path
  end
  
  root 'react#index'

  %w( 404 422 500 ).each do |code|
    get code, :to => "errors#show", :code => code
  end
end
