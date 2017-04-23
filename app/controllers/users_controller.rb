class UsersController < ApplicationController
  before_action :logged_in_user, only: [:edit, :update, :index, :destroy]
  before_action :correct_user, only: [:edit, :update]
  before_action :admin_user, only: [:destroy]
  
  def new
    redirect_to root_url if logged_in?
    @user = User.new
  end
  def show
    @user = User.find(params[:id])
    redirect_to root_url and return unless @user.activated?
    #debugger
  end
  def edit
    @user = User.find(params[:id])
  end
  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      flash[:success] = t('.update_success')
      redirect_to @user
    else
      render 'edit'
    end
  end
  
  def create
    @user = User.new(user_params)
    if @user.save
      @user.send_activation_email
      flash[:info] = t('.user_created')
      redirect_to root_url
    else
      render 'new'  
    end
  end
  
  def index
    @users = User.where(activated: true).paginate(page: params[:page])
  end
  
  def destroy
    User.find(params[:id]).destroy
    flash[:success] = t('.success_delete')
    redirect_to users_url
  end
  
  private
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :picture)
    end
    
    
    def correct_user
      @user = User.find(params[:id])
      if !current_user?(@user)
        redirect_to root_url
      end
    end
    
    def admin_user
      if !current_user.admin?
        redirect_to(root_url)
      end
    end
  
end