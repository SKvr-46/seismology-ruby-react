class ApplicationController < ActionController::Base
    def page 
        render html: "this page is not allowed"
    end
end
