require "test_helper"

class CalculationsControllerTest < ActionDispatch::IntegrationTest
  test "should post calculations" do
    post '/wavenumber_calculation', params: { row: 2, column: 2, dx: 1, dy: 1, slipDistribution: "2 2 2 2" }
    assert_response :success
  end
end
