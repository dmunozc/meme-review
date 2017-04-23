require 'test_helper'

class UserTest < ActiveSupport::TestCase
  
  def setup
    @user = User.new(name: "My User", email: "user@google.com", password: "nobars", password_confirmation: "nobars")
  end
  test "should be valid" do
    assert @user.valid?
  end
  test "name should be present" do
    @user.name = ""
    assert_not @user.valid?
  end
  test "email should be present" do
    @user.email = ""
    assert_not @user.valid?
  end
  
  test "name should not be >50 long"do
    @user.name = "c" * 51
    assert_not @user.valid?
  end
  test "email should not be >50 long"do
    @user.email = "a" * 256
    assert_not @user.valid?
  end
  test "email validation good" do
    valid_addresses = %w[user@example.com USER@foo.COM A_US-ER@foo.bar.org first.last@foo.jp alice+bob@baz.cn]
    valid_addresses.each do |valid_address|
      @user.email =valid_address
      assert @user.valid?, valid_address.inspect + " should be valid"
    end
  end
  test "email validation fail" do
    invalid_addresses = %w[user@example,com user_at_foo.org user.name@example. foo@bar_baz.com foo@bar+baz.com]
    invalid_addresses.each do |invalid_address|
      @user.email =invalid_address
      assert_not @user.valid?, invalid_address.inspect + " should not be valid"
    end
  end
  test "email should be unique" do
    dup_user = @user.dup
    dup_user.email = @user.email.upcase
    @user.save
    assert_not dup_user.valid?
  end
  test "pswd min length" do
    @user.password = @user.password_confirmation = "s" * 5
    assert_not @user.valid?
  end
   test "authenticated? should return false for a user with nil digest" do
    assert_not @user.authenticated?(:remember, '')
  end
  
end