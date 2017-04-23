require 'test_helper'

class UserLoginTest < ActionDispatch::IntegrationTest
  
  def setup
    @user = users(:chicho)
  end
  # test "the truth" do
  #   assert true
  # end
  test "loging invalid" do
    get login_path
    assert_template 'sessions/new'
    post login_path, params: {session: {email: "", password: ""}}
    assert_template 'sessions/new'
    assert_not flash.empty?
    get root_path
    assert flash.empty?
  end
  
  test "login valid" do
    get login_path
    post login_path, params:{session: {email: @user.email, password: 'password'}}
    assert is_logged_in?
    assert_redirected_to @user #check redirect target
    follow_redirect! #go to redirect
    assert_template 'users/show'
    assert_select "a[href=?]", login_path, count: 0
    assert_select "a[href=?]", logout_path
    #assert_select "a[href=?]", user_path(@user) #this should be in header. link to my profile
  end
  test "login valid followed by logout" do
    get login_path
    post login_path, params:{session: {email: @user.email, password: 'password'}}
    assert is_logged_in?
    assert_redirected_to @user #check redirect target
    follow_redirect! #go to redirect
    assert_template 'users/show'
    assert_select "a[href=?]", login_path, count: 0
    assert_select "a[href=?]", logout_path
    #assert_select "a[href=?]", user_path(@user) #this should be in header. link to my profile
    delete logout_path
    assert_not is_logged_in?
    assert_redirected_to root_url
    delete logout_path
    follow_redirect!
    #assert_select "a[href=?]", login_path #this should be in header. link to login
    assert_select "a[href=?]", logout_path, count: 0
    assert_select "a[href=?]", user_path(@user), count: 0
    
  end
  test "authenticated? should return false for a user with nil digest" do
    assert_not @user.authenticated?(:reset,'')
  end
  test "loging with remembering" do
    log_in_as(@user, password: "password", remember_me: '1')
    assert_equal cookies["remember_token"],assigns(:user).remember_token 
  end
  test "loging without remembering" do
    log_in_as(@user, password: "password", remember_me: '0')
    assert_nil cookies["remember_token"]
  end
end