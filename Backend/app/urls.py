from django.urls import path
from . import views
from .views import *


urlpatterns = [
    
    # Auth
    path('google-auth/', views.google_authentication, name="google-auth"),
	path('signup/', views.signUp, name="signup"),
	path('login/', views.logIn, name="login"),
	path('forgot/', views.forgot, name="forgot"),
	path('reset/', views.reset, name="reset"),

	path('add-personal-data/', views.add_personal_data, name="add-personal-data"),

	# Add Family Members
	path('get-members/', views.members_list_view, name="member-L"),
    path('add-member/', views.addMember, name="add-member"),
	path('member/<id>/', views.MemberRUD.as_view(), name="member-RUD"),

	# Main
	path('hypertension/', views.bs_hr_input, name="bs-hr-input"),
	path('ecg-input/', views.ecg_input, name="ecg-input"),
	path('activity/', views.step_cal_dist_input, name="step-cal-dist-input"),

]
