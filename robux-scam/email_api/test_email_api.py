import main


with main.app.test_client() as client:
    email = "blah"
    name = "John%20Smith"
    return_val = client.post(f"/api/v1/save/?email={email}&name={name}")
    assert return_val.status_code == 200
    
    cookie = next(
        (cookie for cookie in client.cookie_jar if cookie.name == "client-id"),
        None
    )
    assert cookie is not None
    cookie = cookie.value
    
    assert email == main.get_email(cookie)
    assert "John Smith" == main.get_name(cookie)
