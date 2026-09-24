def three_adiognrgasdahjienfklafghigkallapppp1(posthog):
    try:
        raise RuntimeError("boom")
    except RuntimeError as error:
        posthog.capture_exception(error, distinct_id="python-release-env")
