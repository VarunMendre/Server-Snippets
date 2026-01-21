# Redis SET / GET Commands -- Complete Revision Guide

## 1. SET

Stores a string value against a key.

``` bash
SET key value
```

Example:

``` bash
SET user:1 "Varun"
```

------------------------------------------------------------------------

## 2. GET

Retrieves the value of a key.

``` bash
GET key
```

------------------------------------------------------------------------

## 3. SETNX (Set if Not Exists)

``` bash
SETNX key value
```

Used for locks and one-time initialization.

------------------------------------------------------------------------

## 4. SETEX (Set with Expiry in Seconds)

``` bash
SETEX key seconds value
```

Example:

``` bash
SETEX otp:123 60 "987654"
```

------------------------------------------------------------------------

## 5. PSETEX (Expiry in Milliseconds)

``` bash
PSETEX key milliseconds value
```

------------------------------------------------------------------------

## 6. SET with Options (IMPORTANT)

``` bash
SET key value EX seconds NX
SET key value PX milliseconds XX
```

Options: - EX → Expiry in seconds - PX → Expiry in milliseconds - NX →
Set only if key does not exist - XX → Set only if key exists

------------------------------------------------------------------------

## 7. GETSET

Atomically sets a new value and returns the old value.

``` bash
GETSET key newValue
```

------------------------------------------------------------------------

## 8. MSET (Multiple Set)

``` bash
MSET key1 value1 key2 value2
```

------------------------------------------------------------------------

## 9. MGET (Multiple Get)

``` bash
MGET key1 key2
```

------------------------------------------------------------------------

## 10. INCR

``` bash
INCR counter
```

------------------------------------------------------------------------

## 11. INCRBY

``` bash
INCRBY counter 5
```

------------------------------------------------------------------------

## 12. DECR

``` bash
DECR counter
```

------------------------------------------------------------------------

## 13. DECRBY

``` bash
DECRBY counter 3
```

------------------------------------------------------------------------

## 14. EXPIRE

``` bash
EXPIRE key seconds
```

------------------------------------------------------------------------

## 15. TTL

``` bash
TTL key
```

Return values: - \>0 → seconds left - -1 → no expiry - -2 → key does not
exist

------------------------------------------------------------------------

## 16. EXISTS

``` bash
EXISTS key
```

------------------------------------------------------------------------

## 17. DEL

``` bash
DEL key
```

------------------------------------------------------------------------

## 18. TYPE

``` bash
TYPE key
```

------------------------------------------------------------------------

## Practice Commands

``` bash
SET user:1 "Varun"
GET user:1
SET otp:1 EX 60
TTL otp:1
INCR visits
MSET a 1 b 2
MGET a b
```

------------------------------------------------------------------------

## Interview Notes

-   Redis strings are binary-safe
-   INCR/DECR are atomic
-   Prefer `SET` with options over SETEX/SETNX
-   TTL is key-level, not value-level
