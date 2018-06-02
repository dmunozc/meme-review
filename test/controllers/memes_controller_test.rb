require 'test_helper'

class MemesControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get memes_show_url
    assert_response :success
  end

end
