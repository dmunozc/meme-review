class SubscriptionsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create
    cookies.permanent.signed[:endpoint] = params[:subscription][:endpoint]
    subscription = Subscription.new(endpoint: params[:subscription][:endpoint], p256dh: params[:subscription][:keys][:p256dh], auth:params[:subscription][:keys][:auth])
    if subscription.save
      head :created
    else
      head :expectation_failed
    end
    
    
  end
  def destroy
    if Subscription.find_by(endpoint: cookies.signed[:endpoint]).destroy
      cookies.delete(:endpoint)
      head :ok
    else
      head :expectation_failed
    end
  end
end
