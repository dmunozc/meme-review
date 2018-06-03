class SubscriptionsController < ApplicationController
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
    Subscription.find_by(endpoint: cookies.signed[:endpoint]).destroy
    cookies.delete(:endpoint)
    head :ok
  end
  
end
