import { json } from '@sveltejs/kit';



export async function load({ params }) {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImE2NzA5MGE4LTJjMjktNGIwMy04ODI4LWNlY2E5NDhlY2M0MiIsImlhdCI6MTc1OTIyMTU0OSwic3ViIjoiZGV2ZWxvcGVyLzE0N2ZjMDUxLWEzNWItOWRjYi0zOWU3LTE0ZGU3MTM3OTRhOSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxOTUuMjE2LjM1LjE4OSIsIjQ1Ljc5LjIxOC43OSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.968rjYdp7pubuvTWNJOHcUTmlx85l1HYG30nNmD3cIg7QESMKmyGY_CuescUXB9tj89uo1w8mBJePaAMFpq7JA"
        }
    };

    // Fetch player profile
    const clanUrl = `https://proxy.royaleapi.dev/v1/clans/%23${encodeURIComponent(params.code)}`;
    const clanRes = await fetch(clanUrl, options);
    const clan = await clanRes.json();


    return {
        clan
    };
}